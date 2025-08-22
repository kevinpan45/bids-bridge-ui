<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import TimeView from "$component/TimeView.svelte";
  import toast from "svelte-french-toast";

  let jobs = [];
  let loading = true;
  let showArtifactModal = false;
  let artifactData = null;
  let artifactLoading = false;

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

async function showArtifactDetails(jobId) {
  artifactLoading = true;
  showArtifactModal = true;
  artifactData = null;
  
  try {
    const response = await axios.get(`/api/jobs/${jobId}/artifacts`);
    artifactData = response.data;
    
    // Find the job name from the jobs array
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      artifactData.jobName = job.name;
    }
  } catch (error) {
    console.error('Error fetching artifact details:', error);
    toast.error("Failed to load artifact details");
  } finally {
    artifactLoading = false;
  }
}

function closeArtifactModal() {
  showArtifactModal = false;
  artifactData = null;
}

  onMount(() => {
    axios.get("/api/bff/jobs").then((response) => {
      jobs = response.data;
      loading = false;
    }).catch((error) => {
      console.error('Error fetching jobs:', error);
      loading = false;
    });
  });
</script>

{#if loading}
  <!-- Loading state -->
  <div class="flex justify-center items-center py-16">
    <div class="loading loading-spinner loading-lg"></div>
    <span class="ml-4 text-lg">Loading jobs...</span>
  </div>
{:else if jobs.length === 0}
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
          <td>
            {#if job.artifactId}
              <button 
                class="btn btn-outline btn-xs" 
                on:click={() => showArtifactDetails(job.id)}
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                View Artifact
              </button>
            {:else}
              -
            {/if}
          </td>
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

<!-- Artifact Details Modal -->
{#if showArtifactModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-4xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-lg">Artifact Details</h3>
        <button class="btn btn-sm btn-circle btn-ghost" on:click={closeArtifactModal}>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      {#if artifactLoading}
        <div class="flex justify-center items-center py-8">
          <div class="loading loading-spinner loading-md"></div>
          <span class="ml-2">Loading artifact details...</span>
        </div>
      {:else if artifactData}
        <div class="space-y-6">
          <!-- Artifact Overview Card -->
          <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
              <h4 class="card-title text-primary mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Artifact Information
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Column -->
                <div class="space-y-4">
                  <div class="form-control">
                    <div class="label">
                      <span class="label-text font-semibold">Job Name</span>
                    </div>
                    <div class="bg-base-200 p-3 rounded-lg">
                      <span class="font-medium">{artifactData.jobName || 'Unknown Job'}</span>
                    </div>
                  </div>
                  
                  <div class="form-control">
                    <div class="label">
                      <span class="label-text font-semibold">Status</span>
                    </div>
                    <div class="bg-base-200 p-3 rounded-lg">
                      {#if artifactData.status === "UPLOADED"}
                        <div class="badge badge-success gap-2">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {artifactData.status}
                        </div>
                      {:else if artifactData.status === "PENDING"}
                        <div class="badge badge-warning gap-2">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {artifactData.status}
                        </div>
                      {:else if artifactData.status === "FAILED"}
                        <div class="badge badge-error gap-2">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          {artifactData.status}
                        </div>
                      {:else}
                        <div class="badge badge-neutral">{artifactData.status}</div>
                      {/if}
                    </div>
                  </div>
                  
                  <div class="form-control">
                    <div class="label">
                      <span class="label-text font-semibold">Storage Path</span>
                    </div>
                    <div class="bg-base-200 p-3 rounded-lg">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7"></path>
                        </svg>
                        <span class="font-mono text-sm break-all">{artifactData.storagePath}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Right Column -->
                <div class="space-y-4">
                  <div class="form-control">
                    <div class="label">
                      <span class="label-text font-semibold">Created At</span>
                    </div>
                    <div class="bg-base-200 p-3 rounded-lg">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <TimeView datetime={artifactData.createdAt} />
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-control">
                    <div class="label">
                      <span class="label-text font-semibold">Updated At</span>
                    </div>
                    <div class="bg-base-200 p-3 rounded-lg">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        {#if artifactData.updatedAt}
                          <TimeView datetime={artifactData.updatedAt} />
                        {:else}
                          <span class="text-base-content/60 italic">Not updated</span>
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <div class="text-center py-8">
          <p class="text-gray-500">No artifact data available</p>
        </div>
      {/if}
      
      <div class="modal-action">
        <button class="btn" on:click={closeArtifactModal}>Close</button>
      </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={closeArtifactModal}></div>
  </div>
{/if}
