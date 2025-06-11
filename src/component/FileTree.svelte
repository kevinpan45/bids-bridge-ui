<script>
    import { onMount } from "svelte";

    export let filePaths = [];
    export let fileTree = {};

    function buildTreeFromPaths(paths) {
        const tree = {};

        paths.forEach((path) => {
            const parts = path.split("/");
            let current = tree;

            parts.forEach((part, index) => {
                if (!current[part]) {
                    current[part] = {
                        isFile: index === parts.length - 1,
                        children: {},
                    };
                }
                current = current[part].children;
            });
        });

        return tree;
    }

    if (!fileTree || Object.keys(fileTree).length === 0) {
        fileTree = buildTreeFromPaths(filePaths);
    }

    onMount(() => {});
</script>

<ul class="w-full rounded-lg menu bg-base-200">
    <!-- svelte-ignore a11y-missing-attribute -->
    {#each Object.entries(fileTree) as [name, item]}
        {#if item.isFile}
            <li>
                <a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                    {name}
                </a>
            </li>
        {:else}
            <li>
                <details>
                    <summary>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            />
                        </svg>
                        {name}
                    </summary>
                    <svelte:self fileTree={item.children} />
                </details>
            </li>
        {/if}
    {/each}
</ul>
