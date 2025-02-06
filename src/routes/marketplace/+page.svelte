<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let datasets = [];

  function collectDataset(datasetId) {
    if (!datasetId) {
      toast.error("Dataset ID is required.");
      return;
    }
    axios
      .post(`/api/openneuro/${datasetId}/collections`)
      .then((response) => {
        toast.success(`Dataset ${datasetId} is collecting.`);
      });
  }

  onMount(async () => {
    axios.get("/api/openneuro/bids").then((response) => {
      let items = response.data;
      items.forEach((item) => {
        item.link = `https://openneuro.org/datasets/${item.uid}/versions/${item.version}`;
      });
      datasets = items;
    });
  });
</script>

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
            {dataset.uid}
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
            on:click={collectDataset(dataset.uid)}>Collect</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
