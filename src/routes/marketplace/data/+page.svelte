<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import Pagination from "$component/Pagination.svelte";
  import LoadingOverlay from "$component/LoadingOverlay.svelte";

  let page = {
    size: 10,
    total: 0,
    current: 1,
  };

  let datasets = [];
  let isLoading = false;

  function collectDataset(datasetId) {
    if (!datasetId) {
      toast.error("Dataset ID is required.");
      return;
    }
    isLoading = true;
    axios
      .post(`/api/openneuro/${datasetId}/collections?storageId=1`)
      .then((response) => {
        toast.success(`Dataset ${datasetId} is collecting.`);
      })
      .finally(() => {
        isLoading = false;
      });
  }

  function reloadPageTable() {
    isLoading = true;
    axios
      .get("/api/openneuro/bids", {
        params: {
          page: page.current,
          size: page.size,
        },
      })
      .then((res) => {
        page.total = res.data.total;
        let items = res.data.records;
        items.forEach((item) => {
          item.link = `https://openneuro.org/datasets/${item.doi}/versions/${item.version}`;
        });
        datasets = items;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  onMount(async () => {
    reloadPageTable();
  });
</script>

<div class="relative">
  <LoadingOverlay {isLoading} text="Loading data..." position="absolute" />
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Modality</th>
        <th>Provider</th>
        <th>Participants</th>
        <th>Size</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
      {#each datasets as dataset}
        <tr>
          <td>
            <a href={dataset.link} target="_blank" class="link link-primary">
              {dataset.doi}
            </a>
          </td>
          <td class="max-w-96 tooltip tooltip-right" data-tip={dataset.name}>
            <p class="truncate ...">{dataset.name}</p>
          </td>
          <td>{dataset.modality}</td>
          <td>OpenNeuro</td>
          <td>{dataset.participants}</td>
          <td>
            {#if dataset.size >= 1024 * 1024 * 1024}
              {(dataset.size / (1024 * 1024 * 1024)).toFixed(2)} GB
            {:else}
              {(dataset.size / (1024 * 1024)).toFixed(2)} MB
            {/if}
          </td>
          <td>
            <button
              class="btn btn-primary btn-xs"
              on:click={() => collectDataset(dataset.doi)}>Collect</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {page} reloadPageTable={reloadPageTable} />
</div>
