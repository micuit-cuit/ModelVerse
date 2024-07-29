<script>
    export let name = "Accueil";
    export let url = "/";
    export let discord = false;
    export let check = false;
</script>
{#if discord}
    <a href={url} class="discord">{name}</a>
{:else}
    <a href={url} class="{check?"active":""}">{name}</a>
{/if}
<style>
    a {
        color: var(--text-color);
        text-decoration: none;
        padding: 10px;
        margin: 0 15px;
        text-decoration: none;
        font-weight: bold;
        position: relative;
        transition: color 0.3s;
    }
    a:not(.discord){
        letter-spacing: 0;
        font-weight: bold;
        transition: letter-spacing 0.3s;
    }
    a:not(.discord)::before {
        content: "";
        background-color:transparent;
        border: solid var(--text-color);
        display: block;
        border-width: 3px 0;
        width: 0;
        height: 50%;
        position: absolute;
        bottom: 20%;  
        left: 50%;
        transition: 0.3s;
    }
    a:not(.discord):hover {
        font-weight:bolder;
        letter-spacing: 2px;
    }
    a:hover:not(.discord)::before {
        width: 100%;
        left: 0;
    }

    a.active {
        font-weight:bolder;
        letter-spacing: 2px;
    }
    a.active::before {
        width: 100%;
        left: 0;
    }
    .discord {
        background-color: var(--discord-color);
        padding: 5px 10px;
        border-radius: 15px;
        box-shadow: 0 0 0 2px var(--discord-color);
        transition: background-color 0.3s, box-shadow 0.3s;
    }
    .discord:hover {
        background-color: transparent;
        color: var(--discord-color);
        box-shadow: 2px 2px 2px 2px var(--discord-color);
    }
</style>