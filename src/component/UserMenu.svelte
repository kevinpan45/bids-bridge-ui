<script>
  import { createAuth0Client } from "@auth0/auth0-spa-js";
  // export let logout = () => {};
  export let username;
  async function logout() {
    let auth0Client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    });
    auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
</script>

<div class="hidden md:block">
  <div class="ml-4 flex items-center md:ml-6">
    <!-- Profile dropdown -->
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost">
        <span>{username}</span>
        <span class="badge badge-xs badge-success"></span>
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li><a href="/user/profile">Profile</a></li>
        <li><button on:click={logout}>Logout</button></li>
      </ul>
    </div>
  </div>
</div>
