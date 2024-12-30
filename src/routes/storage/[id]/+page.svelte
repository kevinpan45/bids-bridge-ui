<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { page } from "$app/stores";

  let datasets = [];
  let id = $page.params.id;

  let dataset;
  let files = [];
  let treeJson = {};

  onMount(() => {
    axios.get(`/api/bids/storages/${id}/datasets`).then((res) => {
      datasets = res.data;
    });
  });

  function getFiles(path) {
    files = [
      "ds005700/.datalad/config",
      "ds005700/sub-01/anat/sub-01_T1w.json",
      "ds005700/sub-01/anat/sub-01_T1w.nii.gz",
      "ds005700/sub-01/func/sub-01_task-fe_bold.json",
      "ds005700/sub-01/func/sub-01_task-fe_bold.nii.gz",
      "ds005700/sub-01/func/sub-01_task-rest_bold.json",
      "ds005700/sub-01/func/sub-01_task-rest_bold.nii.gz",
      "ds005700/sub-02/anat/sub-02_T1w.json",
      "ds005700/sub-02/anat/sub-02_T1w.nii.gz",
      "ds005700/sub-02/func/sub-02_task-fe_bold.json",
      "ds005700/sub-02/func/sub-02_task-fe_bold.nii.gz",
      "ds005700/sub-02/func/sub-02_task-rest_bold.json",
      "ds005700/sub-02/func/sub-02_task-rest_bold.nii.gz",
      "ds005700/sub-03/anat/sub-03_T1w.json",
      "ds005700/sub-03/anat/sub-03_T1w.nii.gz",
      "ds005700/sub-03/func/sub-03_task-fe_bold.json",
      "ds005700/sub-03/func/sub-03_task-fe_bold.nii.gz",
      "ds005700/sub-03/func/sub-03_task-rest_bold.json",
      "ds005700/sub-03/func/sub-03_task-rest_bold.nii.gz",
      "ds005700/sub-04/anat/sub-04_T1w.json",
      "ds005700/sub-04/anat/sub-04_T1w.nii.gz",
      "ds005700/sub-04/func/sub-04_task-fe_bold.json",
      "ds005700/sub-04/func/sub-04_task-fe_bold.nii.gz",
      "ds005700/sub-04/func/sub-04_task-rest_bold.json",
      "ds005700/sub-04/func/sub-04_task-rest_bold.nii.gz",
      "ds005700/sub-05/anat/sub-05_T1w.json",
      "ds005700/sub-05/anat/sub-05_T1w.nii.gz",
      "ds005700/sub-05/func/sub-05_task-fe_bold.json",
      "ds005700/sub-05/func/sub-05_task-fe_bold.nii.gz",
      "ds005700/sub-05/func/sub-05_task-rest_bold.json",
      "ds005700/sub-05/func/sub-05_task-rest_bold.nii.gz",
      "ds005700/sub-06/anat/sub-06_T1w.json",
      "ds005700/sub-06/anat/sub-06_T1w.nii.gz",
      "ds005700/sub-06/func/sub-06_task-fe_bold.json",
      "ds005700/sub-06/func/sub-06_task-fe_bold.nii.gz",
      "ds005700/sub-06/func/sub-06_task-rest_bold.json",
      "ds005700/sub-06/func/sub-06_task-rest_bold.nii.gz",
      "ds005700/sub-07/anat/sub-07_T1w.json",
      "ds005700/sub-07/anat/sub-07_T1w.nii.gz",
      "ds005700/sub-07/func/sub-07_task-fe_bold.json",
      "ds005700/sub-07/func/sub-07_task-fe_bold.nii.gz",
      "ds005700/sub-07/func/sub-07_task-rest_bold.json",
      "ds005700/sub-07/func/sub-07_task-rest_bold.nii.gz",
      "ds005700/sub-08/anat/sub-08_T1w.json",
      "ds005700/sub-08/anat/sub-08_T1w.nii.gz",
      "ds005700/sub-08/func/sub-08_task-fe_bold.json",
      "ds005700/sub-08/func/sub-08_task-fe_bold.nii.gz",
      "ds005700/sub-08/func/sub-08_task-rest_bold.json",
      "ds005700/sub-08/func/sub-08_task-rest_bold.nii.gz",
      "ds005700/sub-09/anat/sub-09_T1w.json",
      "ds005700/sub-09/anat/sub-09_T1w.nii.gz",
      "ds005700/sub-09/func/sub-09_task-fe_bold.json",
      "ds005700/sub-09/func/sub-09_task-fe_bold.nii.gz",
      "ds005700/sub-09/func/sub-09_task-rest_bold.json",
      "ds005700/sub-09/func/sub-09_task-rest_bold.nii.gz",
      "ds005700/sub-10/anat/sub-10_T1w.json",
      "ds005700/sub-10/anat/sub-10_T1w.nii.gz",
      "ds005700/sub-10/func/sub-10_task-fe_bold.json",
      "ds005700/sub-10/func/sub-10_task-fe_bold.nii.gz",
      "ds005700/sub-10/func/sub-10_task-rest_bold.json",
      "ds005700/sub-10/func/sub-10_task-rest_bold.nii.gz",
      "ds005700/sub-11/anat/sub-11_T1w.json",
      "ds005700/sub-11/anat/sub-11_T1w.nii.gz",
      "ds005700/sub-11/func/sub-11_task-fe_bold.json",
      "ds005700/sub-11/func/sub-11_task-fe_bold.nii.gz",
      "ds005700/sub-11/func/sub-11_task-rest_bold.json",
      "ds005700/sub-11/func/sub-11_task-rest_bold.nii.gz",
      "ds005700/sub-12/anat/sub-12_T1w.json",
      "ds005700/sub-12/anat/sub-12_T1w.nii.gz",
      "ds005700/sub-12/func/sub-12_task-fe_bold.json",
      "ds005700/sub-12/func/sub-12_task-fe_bold.nii.gz",
      "ds005700/sub-12/func/sub-12_task-rest_bold.json",
      "ds005700/sub-12/func/sub-12_task-rest_bold.nii.gz",
      "ds005700/sub-13/anat/sub-13_T1w.json",
      "ds005700/sub-13/anat/sub-13_T1w.nii.gz",
      "ds005700/sub-13/func/sub-13_task-fe_bold.json",
      "ds005700/sub-13/func/sub-13_task-fe_bold.nii.gz",
      "ds005700/sub-13/func/sub-13_task-rest_bold.json",
      "ds005700/sub-13/func/sub-13_task-rest_bold.nii.gz",
      "ds005700/sub-14/anat/sub-14_T1w.json",
      "ds005700/sub-14/anat/sub-14_T1w.nii.gz",
      "ds005700/sub-14/func/sub-14_task-fe_bold.json",
      "ds005700/sub-14/func/sub-14_task-fe_bold.nii.gz",
      "ds005700/sub-14/func/sub-14_task-rest_bold.json",
      "ds005700/sub-14/func/sub-14_task-rest_bold.nii.gz",
      "ds005700/sub-15/anat/sub-15_T1w.json",
      "ds005700/sub-15/anat/sub-15_T1w.nii.gz",
      "ds005700/sub-15/func/sub-15_task-fe_bold.json",
      "ds005700/sub-15/func/sub-15_task-fe_bold.nii.gz",
      "ds005700/sub-15/func/sub-15_task-rest_bold.json",
      "ds005700/sub-15/func/sub-15_task-rest_bold.nii.gz",
      "ds005700/sub-16/anat/sub-16_T1w.json",
      "ds005700/sub-16/anat/sub-16_T1w.nii.gz",
      "ds005700/sub-16/func/sub-16_task-fe_bold.json",
      "ds005700/sub-16/func/sub-16_task-fe_bold.nii.gz",
      "ds005700/sub-16/func/sub-16_task-rest_bold.json",
      "ds005700/sub-16/func/sub-16_task-rest_bold.nii.gz",
      "ds005700/sub-17/anat/sub-17_T1w.json",
      "ds005700/sub-17/anat/sub-17_T1w.nii.gz",
      "ds005700/sub-17/func/sub-17_task-fe_bold.json",
      "ds005700/sub-17/func/sub-17_task-fe_bold.nii.gz",
      "ds005700/sub-17/func/sub-17_task-rest_bold.json",
      "ds005700/sub-17/func/sub-17_task-rest_bold.nii.gz",
      "ds005700/sub-18/anat/sub-18_T1w.json",
      "ds005700/sub-18/anat/sub-18_T1w.nii.gz",
      "ds005700/sub-18/func/sub-18_task-fe_bold.json",
      "ds005700/sub-18/func/sub-18_task-fe_bold.nii.gz",
      "ds005700/sub-18/func/sub-18_task-rest_bold.json",
      "ds005700/sub-18/func/sub-18_task-rest_bold.nii.gz",
      "ds005700/sub-19/anat/sub-19_T1w.json",
      "ds005700/sub-19/anat/sub-19_T1w.nii.gz",
      "ds005700/sub-19/func/sub-19_task-fe_bold.json",
      "ds005700/sub-19/func/sub-19_task-fe_bold.nii.gz",
      "ds005700/sub-19/func/sub-19_task-rest_bold.json",
      "ds005700/sub-19/func/sub-19_task-rest_bold.nii.gz",
      "ds005700/sub-20/anat/sub-20_T1w.json",
      "ds005700/sub-20/anat/sub-20_T1w.nii.gz",
      "ds005700/sub-20/func/sub-20_task-fe_bold.json",
      "ds005700/sub-20/func/sub-20_task-fe_bold.nii.gz",
      "ds005700/sub-20/func/sub-20_task-rest_bold.json",
      "ds005700/sub-20/func/sub-20_task-rest_bold.nii.gz",
      "ds005700/sub-21/anat/sub-21_T1w.json",
      "ds005700/sub-21/anat/sub-21_T1w.nii.gz",
      "ds005700/sub-21/func/sub-21_task-fe_bold.json",
      "ds005700/sub-21/func/sub-21_task-fe_bold.nii.gz",
      "ds005700/sub-21/func/sub-21_task-rest_bold.json",
      "ds005700/sub-21/func/sub-21_task-rest_bold.nii.gz",
      "ds005700/sub-22/anat/sub-22_T1w.json",
      "ds005700/sub-22/anat/sub-22_T1w.nii.gz",
      "ds005700/sub-22/func/sub-22_task-fe_bold.json",
      "ds005700/sub-22/func/sub-22_task-fe_bold.nii.gz",
      "ds005700/sub-22/func/sub-22_task-rest_bold.json",
      "ds005700/sub-22/func/sub-22_task-rest_bold.nii.gz",
      "ds005700/sub-23/anat/sub-23_T1w.json",
      "ds005700/sub-23/anat/sub-23_T1w.nii.gz",
      "ds005700/sub-23/func/sub-23_task-fe_bold.json",
      "ds005700/sub-23/func/sub-23_task-fe_bold.nii.gz",
      "ds005700/sub-23/func/sub-23_task-rest_bold.json",
      "ds005700/sub-23/func/sub-23_task-rest_bold.nii.gz",
      "ds005700/sub-24/anat/sub-24_T1w.json",
      "ds005700/sub-24/anat/sub-24_T1w.nii.gz",
      "ds005700/sub-24/func/sub-24_task-fe_bold.json",
      "ds005700/sub-24/func/sub-24_task-fe_bold.nii.gz",
      "ds005700/sub-24/func/sub-24_task-rest_bold.json",
      "ds005700/sub-24/func/sub-24_task-rest_bold.nii.gz",
      "ds005700/sub-25/anat/sub-25_T1w.json",
      "ds005700/sub-25/anat/sub-25_T1w.nii.gz",
      "ds005700/sub-25/func/sub-25_task-fe_bold.json",
      "ds005700/sub-25/func/sub-25_task-fe_bold.nii.gz",
      "ds005700/sub-25/func/sub-25_task-rest_bold.json",
      "ds005700/sub-25/func/sub-25_task-rest_bold.nii.gz",
      "ds005700/sub-26/anat/sub-26_T1w.json",
      "ds005700/sub-26/anat/sub-26_T1w.nii.gz",
      "ds005700/sub-26/func/sub-26_task-fe_bold.json",
      "ds005700/sub-26/func/sub-26_task-fe_bold.nii.gz",
      "ds005700/sub-26/func/sub-26_task-rest_bold.json",
      "ds005700/sub-26/func/sub-26_task-rest_bold.nii.gz",
      "ds005700/sub-27/anat/sub-27_T1w.json",
      "ds005700/sub-27/anat/sub-27_T1w.nii.gz",
      "ds005700/sub-27/func/sub-27_task-fe_bold.json",
      "ds005700/sub-27/func/sub-27_task-fe_bold.nii.gz",
      "ds005700/sub-27/func/sub-27_task-rest_bold.json",
      "ds005700/sub-27/func/sub-27_task-rest_bold.nii.gz",
      "ds005700/sub-28/anat/sub-28_T1w.json",
      "ds005700/sub-28/anat/sub-28_T1w.nii.gz",
      "ds005700/sub-28/func/sub-28_task-fe_bold.json",
      "ds005700/sub-28/func/sub-28_task-fe_bold.nii.gz",
      "ds005700/sub-28/func/sub-28_task-rest_bold.json",
      "ds005700/sub-28/func/sub-28_task-rest_bold.nii.gz",
      "ds005700/sub-29/anat/sub-29_T1w.json",
      "ds005700/sub-29/anat/sub-29_T1w.nii.gz",
      "ds005700/sub-29/func/sub-29_task-fe_bold.json",
      "ds005700/sub-29/func/sub-29_task-fe_bold.nii.gz",
      "ds005700/sub-29/func/sub-29_task-rest_bold.json",
      "ds005700/sub-29/func/sub-29_task-rest_bold.nii.gz",
      "ds005700/sub-30/anat/sub-30_T1w.json",
      "ds005700/sub-30/anat/sub-30_T1w.nii.gz",
      "ds005700/sub-30/func/sub-30_task-fe_bold.json",
      "ds005700/sub-30/func/sub-30_task-fe_bold.nii.gz",
      "ds005700/sub-30/func/sub-30_task-rest_bold.json",
      "ds005700/sub-30/func/sub-30_task-rest_bold.nii.gz",
      "ds005700/sub-31/anat/sub-31_T1w.json",
      "ds005700/sub-31/anat/sub-31_T1w.nii.gz",
      "ds005700/sub-31/func/sub-31_task-fe_bold.json",
      "ds005700/sub-31/func/sub-31_task-fe_bold.nii.gz",
      "ds005700/sub-31/func/sub-31_task-rest_bold.json",
      "ds005700/sub-31/func/sub-31_task-rest_bold.nii.gz",
      "ds005700/sub-32/anat/sub-32_T1w.json",
      "ds005700/sub-32/anat/sub-32_T1w.nii.gz",
      "ds005700/sub-32/func/sub-32_task-fe_bold.json",
      "ds005700/sub-32/func/sub-32_task-fe_bold.nii.gz",
      "ds005700/sub-32/func/sub-32_task-rest_bold.json",
      "ds005700/sub-32/func/sub-32_task-rest_bold.nii.gz",
      "ds005700/sub-33/anat/sub-33_T1w.json",
      "ds005700/sub-33/anat/sub-33_T1w.nii.gz",
      "ds005700/sub-33/func/sub-33_task-fe_bold.json",
      "ds005700/sub-33/func/sub-33_task-fe_bold.nii.gz",
      "ds005700/sub-33/func/sub-33_task-rest_bold.json",
      "ds005700/sub-33/func/sub-33_task-rest_bold.nii.gz",
      "ds005700/sub-34/anat/sub-34_T1w.json",
      "ds005700/sub-34/anat/sub-34_T1w.nii.gz",
      "ds005700/sub-34/func/sub-34_task-fe_bold.json",
      "ds005700/sub-34/func/sub-34_task-fe_bold.nii.gz",
      "ds005700/sub-34/func/sub-34_task-rest_bold.json",
      "ds005700/sub-34/func/sub-34_task-rest_bold.nii.gz",
      "ds005700/sub-35/anat/sub-35_T1w.json",
      "ds005700/sub-35/anat/sub-35_T1w.nii.gz",
      "ds005700/sub-35/func/sub-35_task-fe_bold.json",
      "ds005700/sub-35/func/sub-35_task-fe_bold.nii.gz",
      "ds005700/sub-35/func/sub-35_task-rest_bold.json",
      "ds005700/sub-35/func/sub-35_task-rest_bold.nii.gz",
      "ds005700/sub-36/anat/sub-36_T1w.json",
      "ds005700/sub-36/anat/sub-36_T1w.nii.gz",
      "ds005700/sub-36/func/sub-36_task-fe_bold.json",
      "ds005700/sub-36/func/sub-36_task-fe_bold.nii.gz",
      "ds005700/sub-36/func/sub-36_task-rest_bold.json",
      "ds005700/sub-36/func/sub-36_task-rest_bold.nii.gz",
      "ds005700/sub-37/anat/sub-37_T1w.json",
      "ds005700/sub-37/anat/sub-37_T1w.nii.gz",
      "ds005700/sub-37/func/sub-37_task-fe_bold.json",
      "ds005700/sub-37/func/sub-37_task-fe_bold.nii.gz",
      "ds005700/sub-37/func/sub-37_task-rest_bold.json",
      "ds005700/sub-37/func/sub-37_task-rest_bold.nii.gz",
      "ds005700/sub-38/anat/sub-38_T1w.json",
      "ds005700/sub-38/anat/sub-38_T1w.nii.gz",
      "ds005700/sub-38/func/sub-38_task-fe_bold.json",
      "ds005700/sub-38/func/sub-38_task-fe_bold.nii.gz",
      "ds005700/sub-38/func/sub-38_task-rest_bold.json",
      "ds005700/sub-38/func/sub-38_task-rest_bold.nii.gz",
      "ds005700/sub-39/anat/sub-39_T1w.json",
      "ds005700/sub-39/anat/sub-39_T1w.nii.gz",
      "ds005700/sub-39/func/sub-39_task-fe_bold.json",
      "ds005700/sub-39/func/sub-39_task-fe_bold.nii.gz",
      "ds005700/sub-39/func/sub-39_task-rest_bold.json",
      "ds005700/sub-39/func/sub-39_task-rest_bold.nii.gz",
      "ds005700/sub-40/anat/sub-40_T1w.json",
      "ds005700/sub-40/anat/sub-40_T1w.nii.gz",
      "ds005700/sub-40/func/sub-40_task-fe_bold.json",
      "ds005700/sub-40/func/sub-40_task-fe_bold.nii.gz",
      "ds005700/sub-40/func/sub-40_task-rest_bold.json",
      "ds005700/sub-40/func/sub-40_task-rest_bold.nii.gz",
      "ds005700/.gitattributes",
      "ds005700/CHANGES",
      "ds005700/README",
      "ds005700/dataset_description.json",
    ];

    dataset = path;
    document.getElementById("file_tree_modal").showModal();
    treeJson = { dataset: {} };
    files.forEach((file) => {
      let paths = file.split("/");
      let current = treeJson;
      paths.forEach((p, index) => {
        if (index === 0) {
          return;
        }
        if (!current[p]) {
          if (index === paths.length - 1) {
            current[p] = { p: "is_file" };
          } else {
            current[p] = [];
          }
        }
        current = current[p];
      });
    });
    console.log(treeJson);

    // axios.get(`/api/bids/storages/${id}/datasets/${path}/files`).then((res) => {
    //   dataset = path;
    //   files = res.data;
    //   console.log(`Get ${files.length} files.`);
    //   document.getElementById("file_tree_modal").showModal();
    // });
  }
</script>

<dialog id="file_tree_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Dataset [{dataset}] File Tree</h3>
    <div>
      <ul class="menu menu-xs bg-base-200 rounded-lg w-full max-w-xs">
        <li>
          <details open>
            <summary>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              My Files
            </summary>
            <ul>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Project-final.psd
                </a>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Project-final-2.psd
                </a>
              </li>
              <li>
                <details open>
                  <summary>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                    Images
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        Screenshot1.png
                      </a>
                    </li>
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        Screenshot2.png
                      </a>
                    </li>
                    <li>
                      <details open>
                        <summary>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            />
                          </svg>
                          Others
                        </summary>
                        <ul>
                          <li>
                            <a>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-4 w-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                              Screenshot3.png
                            </a>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            reports-final-2.pdf
          </a>
        </li>
      </ul>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

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
        <td
          ><button class="btn btn-sm" on:click={getFiles(dataset)}>Files</button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>
