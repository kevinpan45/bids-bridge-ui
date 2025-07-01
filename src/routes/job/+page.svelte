<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import TimeView from "$component/TimeView.svelte";
  import toast from "svelte-french-toast";

  let jobs = [];

  function deleteJob(id) {
    axios.delete(`/api/jobs/${id}`).then(() => {
      toast.success("Job deleted successfully");
      // sleep 100 ms
      setTimeout(() => {
        window.location.href = "/job";
      }, 100);
    });
  }

  onMount(() => {
    axios.get("/api/bff/jobs").then((response) => {
      jobs = response.data;
    });
  });
</script>

<table class="table w-full table-compact">
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
      <th>Ops</th>
    </tr>
  </thead>
  <tbody>
    {#each jobs as job}
      <tr>
        <td>{job.id}</td>
        <td>{job.name}</td>
        <td>{job.group ?? "-"}</td>
        <td>
          {#if job.status === "FINISHED"}
            <div class="badge badge-success">{job.status}</div>
          {:else if job.status === "MANUAL_STOPPED" || job.status === "FAILED" || job.status === "ABNORMAL_STOPPED"}
            <div class="badge badge-error">{job.status}</div>
          {:else if job.status === "DELETED"}
            <div class="badge badge-neutral">{job.status}</div>
          {:else}
            <div class="badge badge-info">{job.status}</div>
          {/if}
        </td>
        <td>{job.pipelineName}:{job.pipelineVersion}</td>
        <td
          ><a class="link" href="/dataset/{job.datasetId}">{job.datasetDoi}</a
          ></td
        >
        <td>{job.engineJobId}</td>
        <td>{job.artifactId ?? "-"}</td>
        <td><TimeView datetime={job.createdAt} /></td>
        <td
          ><button class="btn btn-primary btn-xs" on:click={deleteJob(job.id)}
            >Delete</button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>
