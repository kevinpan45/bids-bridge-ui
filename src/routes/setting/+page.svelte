<script>
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let engine = {
    apiServer: "https://kubernetes.default.svc",
    namespace: "pipeline",
    token: "",
  }

  function updateEngine() {
    // engine attrs cannot be blank
    if (!engine.apiServer || !engine.namespace || !engine.token) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Engine updated successfully");
  }

  onMount(() => {
    
  });
</script>

<div class="hero min-h-screen">
  <div class="hero-content w-2/3 flex-col lg:flex-row-reverse">
    <div class="card bg-base-200 w-full shrink-0 shadow-2xl">
      <form class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">API Server</span>
          </label>
          <input type="text" class="input input-bordered" required value={engine.apiServer} />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Namespace</span>
          </label>
          <input type="text" class="input input-bordered" required value={engine.namespace} />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Token</span>
          </label>
          <input type="password" class="input input-bordered" required />
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" on:click={updateEngine}>Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
