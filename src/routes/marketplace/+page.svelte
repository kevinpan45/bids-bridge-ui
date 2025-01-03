<script>
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let datasets = [];

  function collectDataset(datasetId) {
    toast.success(`Dataset ${datasetId} collecting in background`);
  }

  onMount(async () => {
    fetch("/openneuro-datasets.json")
      .then(async (response) => {
        let rawData = await response.json();
        rawData.data.datasets.edges.forEach((item) => {
          let dataset = {
            id: item.node.id,
            name: item.node.name,
            modality: item.node.latestSnapshot.summary.modalities,
            participants: item.node.latestSnapshot.summary.subjects.length,
            link: `https://openneuro.org/datasets/${item.node.id}`,
          };
          datasets.push(dataset);
        });
        datasets = datasets;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch datasets");
        return;
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
            {dataset.id}
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
            on:click={collectDataset(dataset.id)}>Collect</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
