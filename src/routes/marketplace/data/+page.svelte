<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import Pagination from "$component/Pagination.svelte";
  import LoadingOverlay from "$component/LoadingOverlay.svelte";

  let providers = ["All", "OpenNeuro", "CCNDC"];
  let provider = providers[0];

  // Provider descriptions
  const providerDescriptions = [
    {
      name: "OpenNeuro",
      avatar: "https://openneuro.org/assets/on-dark-DlVjE234.svg",
      description:
        "OpenNeuro is a free and open platform for sharing and analyzing neuroimaging data.",
      link: "https://openneuro.org/",
    },
    {
      name: "CCNDC",
      avatar: "https://www.scidb.cn/static/pageTemPic/o00133/logo.png",
      description:
        "Chinese Color Nest Data Community: Fostering Lifespan Development of Brain-Mind Health",
      link: "https://ccnp.scidb.cn/en",
    },
  ];

  let showDescriptionModal = false;

  let page = {
    size: 10,
    total: 0,
    current: 1,
  };

  let datasets = [];
  let isLoading = false;

  function collectDataset(datasetId) {
    if (!datasetId) {
      toast.error("Dataset ID is required.");
      return;
    }
    isLoading = true;
    axios
      .post(`/api/openneuro/${datasetId}/collections?storageId=1`)
      .then((response) => {
        toast.success(`Dataset ${datasetId} is collecting.`);
      })
      .finally(() => {
        isLoading = false;
      });
  }

  function reloadPageTable() {
    isLoading = true;
    axios
      .get("/api/openneuro/bids", {
        params: {
          page: page.current,
          size: page.size,
          provider: provider === "All" ? null : provider,
        },
      })
      .then((res) => {
        page.total = res.data.total;
        let items = res.data.records;
        items.forEach((item) => {
          item.link = `https://openneuro.org/datasets/${item.doi}/versions/${item.version}`;
        });
        datasets = items;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  function handleProviderChange(event) {
    provider = event.target.value;
    reloadPageTable();
  }

  function showProviderDescriptions() {
    showDescriptionModal = true;
  }

  onMount(async () => {
    reloadPageTable();
  });
</script>

<div class="relative">
  <div class="flex justify-between items-center mb-4">
    <div class="form-control w-64">
      <div class="flex items-center space-x-2">
        <select
          class="select select-bordered w-full"
          bind:value={provider}
          on:change={handleProviderChange}
        >
          {#each providers as providerOption}
            <option value={providerOption}>{providerOption}</option>
          {/each}
        </select>
        <button
          class="btn btn-ghost"
          on:click={showProviderDescriptions}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-4 h-4 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path></svg
          >
        </button>
      </div>
    </div>
  </div>
  <LoadingOverlay {isLoading} text="Loading data..." position="absolute" />
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Modality</th>
        <th>Provider</th>
        <th>Participants</th>
        <th>Size</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
      {#each datasets as dataset}
        <tr>
          <td>
            <a href={dataset.link} target="_blank" class="link link-primary">
              {dataset.doi}
            </a>
          </td>
          <td class="max-w-96 tooltip tooltip-right" data-tip={dataset.name}>
            <p class="truncate ...">{dataset.name}</p>
          </td>
          <td>{dataset.modality}</td>
          <td>OpenNeuro</td>
          <td>{dataset.participants}</td>
          <td>
            {#if dataset.size >= 1024 * 1024 * 1024}
              {(dataset.size / (1024 * 1024 * 1024)).toFixed(2)} GB
            {:else}
              {(dataset.size / (1024 * 1024)).toFixed(2)} MB
            {/if}
          </td>
          <td>
            <button
              class="btn btn-primary btn-xs"
              on:click={() => collectDataset(dataset.doi)}>Collect</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {page} {reloadPageTable} />
</div>

<!-- Provider Description Modal -->
{#if showDescriptionModal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
  >
    <div class="bg-base-100 p-6 rounded-lg shadow-lg max-w-3xl w-full">
      <h3 class="font-bold text-lg mb-4">Data Provider</h3>
      <ul class="menu bg-base-200 rounded-box w-full">
        <div class="overflow-x-auto">
          <table class="table">
            <tbody>
              {#each providerDescriptions.filter((p) => p !== "All") as providerDescription}
                <tr>
                  <td>
                    <div class="avatar">
                      <div class="mask h-12 w-12">
                        <img
                          src={providerDescription.avatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    {providerDescription.name}
                  </td>
                  <td>{providerDescription.description}</td>
                  <th>
                    <a
                      class="btn btn-ghost btn-xs"
                      href={providerDescription.link}
                      target="_blank">WebSite</a
                    >
                  </th>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </ul>
      <div class="modal-action">
        <button class="btn" on:click={() => (showDescriptionModal = false)}
          >Close</button
        >
      </div>
    </div>
  </div>
{/if}
