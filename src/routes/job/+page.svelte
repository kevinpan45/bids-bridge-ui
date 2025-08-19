<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import TimeView from "$component/TimeView.svelte";
  import toast from "svelte-french-toast";

  let jobs = [];

function deleteJob(id) {
  if (confirm('Are you sure you want to delete this job?')) {
    axios.delete(`/api/jobs/${id}`).then(() => {
      toast.success("Job deleted successfully");
      setTimeout(() => {
        window.location.href = "/job";
      }, 100);
    });
  }
}

  onMount(() => {
    axios.get("/api/bff/jobs").then((response) => {
      jobs = response.data;
    });
  });
</script>

{#if jobs.length === 0}
  <!-- Empty state for no jobs -->
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="text-center max-w-md">
      <!-- Job icon using SVG -->
      <div class="mb-6">
        <svg class="w-20 h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      </div>
      
      <!-- Main message -->
      <h3 class="text-2xl font-bold text-gray-800 mb-2">No jobs yet</h3>
      <p class="text-gray-600 mb-6">
        You haven't created any jobs yet. Start by creating your first job to process your datasets.
      </p>
      
      <!-- Call to action buttons -->
      <div class="flex justify-center">
        <a href="/dataset" class="btn btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          Browse Datasets
        </a>
      </div>
    </div>
  </div>
{:else}
  <!-- Jobs table -->
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
{/if}
