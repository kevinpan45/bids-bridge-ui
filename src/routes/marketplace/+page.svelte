<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let datasets = [];

  function collectDataset(datasetId) {
    toast.error(`It's developing...`);
  }

  onMount(async () => {
    axios.get("/api/bids/openneuro/datasets").then((response) => {
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
          <button
            class="btn btn-primary btn-xs"
            on:click={collectDataset(dataset.uid)}>Collect</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
