<script>
    export let title = "Title";
    export let url = "";
    export let acction = () => {};
</script>

<a href={url} on:click={acction}>{title}</a>

<style>
    a {
        color: var(--text-color);
        text-decoration: none;
        padding: 10px;
        margin: 0 15px;
        text-decoration: none;
        font-weight: bold;
        background-color: var(--secondary-color);   
        padding: 5px 10px;
        border-radius: 15px;
        box-shadow: 0 0 0 2px var(--secondary-color);
        transition: background-color 0.3s , color 0.3s, box-shadow 0.3s;

    }
    a:hover {
        background-color: transparent;
        color: var(--secondary-color);
        box-shadow: 2px 2px 2px 2px var(--secondary-color);
    }
</style>