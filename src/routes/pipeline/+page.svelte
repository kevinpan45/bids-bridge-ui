<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let pipelines = [];

  function run(pipelineId) {
    toast.error("It's developing...");
  }

  onMount(() => {
    axios.get("/api/pipelines").then((response) => {
      pipelines = response.data;
    });
  });
</script>

<a class="btn btn-primary btn-sm" href="/pipeline/create">Create</a>

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
        <td>{pipeline.provider ?? 'BIDS Apps'}</td>
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
