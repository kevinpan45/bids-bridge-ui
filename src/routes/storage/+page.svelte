<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let storages = [];
  onMount(() => {
    axios.get("/api/bids/storages").then((res) => {
      storages = res.data;
    });
  });
</script>

<a class="btn btn-primary btn-sm" href="/storage/create">Create</a>

<table class="table w-full">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Provider</th>
      <th>Endpoint</th>
      <th>Region</th>
      <th>Bucket</th>
      <th>Prefix</th>
    </tr>
  </thead>
  <tbody>
    {#each storages as storage}
      <tr>
        <td>{storage.id}</td>
        <td
          ><a href="/storage/{storage.id}" class="link link-primary"
            >{storage.name}</a
          ></td
        >
        <td>{storage.provider}</td>
        <td>{storage.endpoint ?? "-"}</td>
        <td>{storage.region}</td>
        <td>{storage.bucket}</td>
        <td>{storage.prefix}</td>
      </tr>
    {/each}
  </tbody>
</table>
