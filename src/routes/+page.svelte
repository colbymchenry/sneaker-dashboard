<script lang="ts">
    import Button from "$lib/shared/Button.svelte";
    import Drawer from "$lib/shared/Drawer.svelte";
    import GoogleMap from "$lib/shared/GoogleMap.svelte";
    import Table from "$lib/shared/table/Table.svelte";

    const columns = [
    { title: 'Name', className: 'text-left' },
    { title: 'Age', className: 'text-center' },
    { title: 'Email', className: 'text-right' },
  ];

  const data = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Doe', age: 25, email: 'jane@example.com' },
    { name: 'Bob Smith', age: 40, email: 'bob@example.com' },
  ];

  const total = data.reduce((acc, row) => acc + row.age, 0);
</script>

<Table className="w-full" columns={columns} data={data} total={total} />

<section class="mt-6 w-full h-[70vh]">
  <GoogleMap className="w-full h-full"/>
</section>
