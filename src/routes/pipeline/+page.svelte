<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let pipelines = [];

  function run(pipelineId) {
    toast.error("It's developing...");
  }

  onMount(() => {
    axios
      .get(
        "https://ylgmn9rprit35l1x.public.blob.vercel-storage.com/bids-app-26lODF7O2cUzqm9bngpf7oW5v2FANr.json"
      )
      .then((response) => {
        let apps = response.data.apps;
        apps.forEach((app) => {
          pipelines.push({
            id: app.dh,
            name: app.description,
            version: "-",
            provider: "BIDS Standard",
            workflow: app.gh,
          });
        });
        pipelines = pipelines;
      });
  });
</script>

<table class="table table-compact w-full">
  <thead>
    <tr>
      <th>Name</th>
      <th>Version</th>
      <th>Provider</th>
      <th>Workflow</th>
      <th>Operation</th>
    </tr>
  </thead>
  <tbody>
    {#each pipelines as pipeline}
      <tr>
        <td>{pipeline.name}</td>
        <td>{pipeline.version}</td>
        <td>{pipeline.provider}</td>
        <td>{pipeline.workflow}</td>
        <td>
          <!-- <button class="btn btn-primary btn-xs" on:click={run(pipeline.id)}
            >Run</button
          > -->
        </td>
      </tr>
    {/each}
  </tbody>
</table>
