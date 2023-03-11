<script>
    export let color = 'primary';
    export let size = 'md';
    export let disabled = false;
    export let className = '';
    export let type = 'button';
    export let loading = false;
    export let style = '';

    const colorClasses = {
        primary: 'bg-primary hover:bg-opacity-90 text-accent',
        secondary: 'bg-secondary hover:bg-opacity-90 text-accent',
        error: 'bg-error hover:bg-opacity-90 text-accent',
    };

    const sizeClasses = {
        sm: 'py-1 px-2 text-sm rounded',
        md: 'py-2 px-4 text-base rounded-md',
        lg: 'py-3 px-6 text-lg rounded-lg',
    };

    let disabledBeforeLoading = disabled;

    $: if (loading) {
        disabledBeforeLoading = disabled;
        disabled = true;
    } else {
        disabled = disabledBeforeLoading;
    }

    $: classes = `${colorClasses[color]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

</script>

<button class={classes} {disabled} {type} {style} on:click>
    {#if loading}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 3.042 1.135 5.824 3 7.938l.002-.001zm10-.001A7.962 7.962 0 0118 12h-4c0 3.042 1.135 5.824 3 7.938l.002-.001z"></path>
        </svg>
    {/if}
    <slot/>
</button>

<style lang="scss">
    button {
      @apply flex items-center;
    }
</style>