<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let jobs = [];

  onMount(() => {
    axios.get("/api/jobs").then((response) => {
      jobs = response.data;
    });
  });
</script>

<table class="table table-compact w-full">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Group</th>
      <th>Status</th>
      <th>Pipeline</th>
      <th>Dataset</th>
      <th>Engine Job</th>
      <th>Artifact</th>
      <th>Create Time</th>
    </tr>
  </thead>
  <tbody>
    {#each jobs as job}
      <tr>
        <td>{job.id}</td>
        <td>{job.name}</td>
        <td>{job.group ?? '-'}</td>
        <td>{job.status}</td>
        <td>{job.pipelineId}</td>
        <td>{job.datasetId}</td>
        <td>{job.engineJobId}</td>
        <td>{job.artifactId ?? '-'}</td>
        <td>{job.createdAt}</td>
      </tr>
    {/each}
  </tbody>
</table>
