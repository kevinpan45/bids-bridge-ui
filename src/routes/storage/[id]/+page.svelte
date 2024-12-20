<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { page } from "$app/stores";

  let datasets = [];
  let id = $page.params.id;

  onMount(() => {
    axios.get(`/api/bids/storages/${id}/datasets`).then((res) => {
      datasets = res.data;
    });
  });
</script>

<table class="table w-full">
  <thead>
    <tr>
      <th>Name</th>
      <th>Path</th>
      <th>Ops</th>
    </tr>
  </thead>
  <tbody>
    {#each datasets as dataset}
      <tr>
        <td>{dataset}</td>
        <td>{dataset + "/"}</td>
        <td><button class="btn btn-sm">Files</button></td>
      </tr>
    {/each}
  </tbody>
</table>
