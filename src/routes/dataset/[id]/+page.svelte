<script>
  import { page } from "$app/stores";
  import axios from "axios";
  import { onMount } from "svelte";
  import FileTree from "$component/FileTree.svelte";

  // get id from route parameters
  let id = $page.params.id;
  let dataset;

  let filePaths;

  function getWebsite() {
    return `https://doi.org/${dataset.doi}`;
  }

  function viewFiles() {
    axios
      .get(`/api/datasets/${id}/files`)
      .then((response) => {
        filePaths = response.data;
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }

  onMount(() => {
    axios
      .get(`/api/datasets/${id}`)
      .then((response) => {
        dataset = response.data;
        dataset.link = getWebsite();
      })
      .catch((error) => {
        console.error("Error fetching dataset:", error);
        return {};
      });
  });
</script>

{#if dataset}
  <div class="card bg-neutral text-neutral-content">
    <div class="text-left items-left card-body">
      <h2 class="card-title">{dataset.name}</h2>
      <p>{dataset.description ?? ""}</p>
      <p>DOI: {dataset.doi}</p>
      <p>Provider: {dataset.provider}</p>
      <div class="justify-end card-actions">
        <a class="btn btn-primary" href={dataset.link} target="_blank"
          >WebSite</a
        >
        <button class="btn btn-primary" on:click={viewFiles}>View Files</button>
      </div>
    </div>
  </div>
{/if}

{#if filePaths}
  <FileTree {filePaths} />
{/if}
