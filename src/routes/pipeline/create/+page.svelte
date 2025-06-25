<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import toast from "svelte-french-toast";

    let pipeline = {};

    let workflows = [];

    function create() {
        axios
            .post("/api/pipelines", pipeline)
            .then((response) => {
                toast.success("Pipeline created successfully");
                window.location.href = "/pipeline";
            })
            .catch((error) => {
                console.error("Failed to create pipeline:", error);
                toast.error("Failed to create pipeline");
            });
    }

    onMount(() => {
        axios
            .get("/api/engines/workflows")
            .then((response) => {
                workflows = response.data;
            })
            .catch((error) => {
                console.error("Failed to fetch workflows:", error);
                toast.error("Failed to fetch workflows");
            });
    });
</script>

<div class="hero">
    <div class="hero-content w-2/3 flex-col lg:flex-row-reverse">
        <div class="card bg-base-200 w-full shrink-0 shadow-2xl">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <form class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        class="input input-bordered"
                        required
                        bind:value={pipeline.name}
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Version</span>
                    </label>
                    <input
                        type="text"
                        class="input input-bordered"
                        required
                        bind:value={pipeline.version}
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Workflow</span>
                    </label>
                    <select
                        class="select select-bordered"
                        required
                        bind:value={pipeline.workflow}
                    >
                        <option value="" disabled selected>Select a workflow</option>
                        {#each workflows as workflow}
                            <option value={workflow}>{workflow}</option>
                        {/each}
                    </select>
                </div>
                <div class="form-control mt-6">
                    <div class="flex justify-end space-x-2">
                        <button class="btn btn-primary" on:click={create}
                            >Submit</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
