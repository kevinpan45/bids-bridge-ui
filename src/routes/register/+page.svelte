<script>
  import axios from "axios";
  import toast from "svelte-french-toast";

  let email;
  let password;
  let confirmPassword;

  function register() {}
</script>

<div class="hero min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Register now!</h1>
      <p class="py-6">
        Join our platform to start managing and collecting bids efficiently.
        <br />
        <br />
        Already have an account?{" "}
        <a href="/login" class="link link-primary">Login</a>
      </p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <form class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            class="input input-bordered"
            bind:value={email}
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            class="input input-bordered"
            bind:value={password}
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Confirm</span>
          </label>
          <input
            type="password"
            class="input input-bordered"
            bind:value={confirmPassword}
            required
          />
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" on:click={register}>register</button>
        </div>
      </form>
    </div>
  </div>
</div>
