<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Pagination from "$component/Pagination.svelte";
  import LoadingOverlay from "$component/LoadingOverlay.svelte";

  let page = {
    size: 10,
    total: 0,
    current: 1,
  };

  let bidsApps = [];
  let isLoading = false;

  function reloadPageTable() {
    isLoading = true;
    axios
      .get("/api/bids-apps", {
        params: {
          page: page.current,
          size: page.size,
        },
      })
      .then((res) => {
        page.total = res.data.total;
        bidsApps = res.data.records;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  onMount(async () => {
    reloadPageTable();
  });
</script>

<div class="relative">
  <LoadingOverlay {isLoading} text="Loading data..." position="absolute" />
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Version</th>
        <th>Description</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
      {#each bidsApps as bidsApp}
        <tr>
          <td class="max-w-64 tooltip tooltip-right" data-tip={bidsApp.name}>
            <p class="truncate ...">{bidsApp.name}</p>
          </td>
          <td>{bidsApp.version}</td>
          <td
            class="max-w-96 tooltip tooltip-right"
            data-tip={bidsApp.description}
          >
            <p class="truncate ...">{bidsApp.description}</p>
          </td>
          <td>
            <button class="btn btn-primary btn-xs">Deploy</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {page} {reloadPageTable} />
</div>
