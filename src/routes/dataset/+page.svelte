<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import TimeView from "$component/TimeView.svelte";

  let datasets = [];
  let dataset = {};
  let jobParams = {
    name: null,
    group: null,
    pipelineId: null,
    datasetId: null,
  };
  onMount(() => {
    axios.get("/api/storages/1/datasets").then((res) => {
      datasets = res.data;
    });
  });
  let pipelines = [];
  async function runDatasetJob(selected) {
    jobParams = {
      name: null,
      group: null,
      pipelineId: null,
      datasetId: null,
    };
    axios.get("/api/pipelines").then((res) => {
      pipelines = res.data;
    });
    dataset = selected;
    jobParams.datasetId = dataset.id;
    document.getElementById("run_dataset_job_modal").showModal();
  }

  function onSelectPipeline(event) {
    jobParams.pipelineId = event.target.value;
  }

  function createJob() {
    if (!jobParams.pipelineId || !jobParams.datasetId || !jobParams.name) {
      console.log("jobParams", jobParams);
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .post(
        "/api/jobs",
        {
          name: jobParams.name,
          group: jobParams.group,
          pipelineId: jobParams.pipelineId,
          datasetId: jobParams.datasetId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Job created successfully");
        // redirect to job page
        window.location.href = `/job`;
      })
      .catch((err) => {
        toast.error("Failed to create job");
      });
  }
</script>

<!-- <a class="btn btn-primary btn-sm" href="/storage/create">Create</a> -->

<table class="table w-full">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>DOI</th>
      <th>Version</th>
      <th>Storage Path</th>
      <th>Create Time</th>
      <th>Ops</th>
    </tr>
  </thead>
  <tbody>
    {#each datasets as dataset}
      <tr>
        <td>{dataset.id}</td>
        <td
          ><a href="/storage/{dataset.id}" class="link link-primary"
            >{dataset.name}</a
          ></td
        >
        <td>{dataset.doi}</td>
        <td>{dataset.version || ""}</td>
        <td>{dataset.storagePath}</td>
        <td><TimeView datetime={dataset.createdAt} /></td>
        <td
          ><button
            class="btn btn-primary btn-xs"
            on:click={runDatasetJob(dataset)}>Run</button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>

<!-- svelte-ignore a11y-label-has-associated-control -->
<dialog class="modal" id="run_dataset_job_modal">
  <div class="modal-box w-11/12 max-w-6xl">
    <h3 class="font-bold text-lg">
      Create Job for Dataset [{dataset.id}] : {dataset.name}
    </h3>
    <div class="form-control w-full max-w-5xl">
      <div class="stats shadow">
        <div class="stat place-items-center">
          <div class="stat-title">Job Parameters</div>
          <div class="stat-value w-full">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Job Group Name</span>
              </label>
              <input
                type="text"
                id="jobGroupName"
                class="input input-bordered input-md w-auto"
                bind:value={jobParams.group}
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Job Name</span>
              </label>
              <input
                type="text"
                id="jobName"
                class="input input-bordered input-md w-auto"
                bind:value={jobParams.name}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="divider">Select Pipeline</div>
      <div class="overflow-x-auto">
        <table class="table table-xs">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Version</th>
              <th>Workflow</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {#each pipelines as pipeline}
              <tr class="hover">
                <th>
                  <input
                    name="pipelineToRun"
                    type="radio"
                    class="radio radio-sm radio-accent"
                    on:change={onSelectPipeline}
                    value={pipeline.id}
                  />
                </th>
                <td>{pipeline.name}</td>
                <td>{pipeline.version}</td>
                <td>{pipeline.workflow}</td>
                <td>{pipeline.description}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-action">
      <button class="btn" on:click={createJob}>Run</button>
      <button
        on:click={() =>
          document.getElementById("run_dataset_job_modal").close()}
        class="btn">Close</button
      >
    </div>
  </div>
</dialog>
