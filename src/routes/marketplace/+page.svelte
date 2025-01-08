<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let datasets = [];

  function collectDataset(datasetId) {
    toast.error(`It's developing...`);
  }

  function blobToArray(rawData) {
    let array = [];
    // read line
    let lines = rawData.split("\n");
    lines.forEach((line) => {
      if (line) {
        let item;
        try {
          item = JSON.parse(line);
        } catch (error) {
          console.error("Error parsing JSON string: " + line);
          return;
        }
        let dataset = {
          id: item.node.id,
          name: item.node.latestSnapshot.description.Name,
          modality: item.node.latestSnapshot.summary.modalities,
          participants: item.node.latestSnapshot.summary.subjects.length,
          link: `https://openneuro.org/datasets/${item.node.id}/versions/${item.node.latestSnapshot.tag}`,
        };
        array.push(dataset);
      }
    });
    return array;
  }

  onMount(async () => {
    const blobUrl =
      "https://ylgmn9rprit35l1x.public.blob.vercel-storage.com/latest-6KyqDZST2yOEmctOGcc63XQv47H4FX.txt";
    axios.get(blobUrl).then((response) => {
      let rawData = response.data;
      let cached = blobToArray(rawData);
      datasets = cached;
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
