<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import Pagination from "$component/Pagination.svelte";

  let bidsAppPage = {
    size: 10,
    total: 0,
    current: 1,
  };

  let datasetPage = {
    size: 10,
    total: 0,
    current: 1,
  };

  let datasets = [];
  let bidsApps = [];
  let activeTab = "datasets";

  function collectDataset(datasetId) {
    if (!datasetId) {
      toast.error("Dataset ID is required.");
      return;
    }
    axios
      .post(`/api/openneuro/${datasetId}/collections?storageId=1`)
      .then((response) => {
        toast.success(`Dataset ${datasetId} is collecting.`);
      });
  }

  function reloadDatasetPageTable() {
    axios
      .get("/api/openneuro/bids", {
        params: {
          page: datasetPage.current,
          size: datasetPage.size,
        },
      })
      .then((res) => {
        datasetPage.total = res.data.total;
        let items = res.data.records;
        items.forEach((item) => {
          item.link = `https://openneuro.org/datasets/${item.doi}/versions/${item.version}`;
        });
        datasets = items;
      });
  }

  function reloadBidsAppPageTable() {
    axios
      .get("/api/bids-apps", {
        params: {
          page: bidsAppPage.current,
          size: bidsAppPage.size,
        },
      })
      .then((res) => {
        bidsAppPage.total = res.data.total;
        bidsApps = res.data.records;
      });
  }

  onMount(async () => {
    reloadDatasetPageTable();

    reloadBidsAppPageTable();
  });
</script>

<div class="pb-4">
  <button
    class="btn btn-sm {activeTab === 'datasets' ? 'btn-info' : ''}"
    on:click={() => (activeTab = "datasets")}>Dataset</button
  >
  <button
    class="btn btn-sm {activeTab === 'pipelines' ? 'btn-info' : ''}"
    on:click={() => (activeTab = "pipelines")}>Pipeline</button
  >
</div>

{#if activeTab === "datasets"}
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
  <Pagination page={datasetPage} reloadPageTable={reloadDatasetPageTable} />
{:else if activeTab === "pipelines"}
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Version</th>
        <th>Description</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
      {#each bidsApps as bidsApp}
        <tr>
          <td class="max-w-64 tooltip tooltip-right" data-tip={bidsApp.name}>
            <p class="truncate ...">{bidsApp.name}</p>
          </td>
          <td>{bidsApp.version}</td>
          <td
            class="max-w-96 tooltip tooltip-right"
            data-tip={bidsApp.description}
          >
            <p class="truncate ...">{bidsApp.description}</p>
          </td>
          <td>
            <button class="btn btn-primary btn-xs">Deploy</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination page={bidsAppPage} reloadPageTable={reloadBidsAppPageTable} />
{/if}
