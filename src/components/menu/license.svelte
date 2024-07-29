<script>
    export let product = "cpmSite";
    export let author = "micuit-cuit";
    export let url = "localhost";
    export let license = "MIT";
</script>
<div class="contentDiv">
    <h1>{product}</h1>
    <p>par {author}</p>
    <p>Licensié sous {license}</p>
    <a href={url}>Lien vers {product}</a>
</div>
<style>
    .contentDiv{
        margin: 20px;;
        padding: 50px;
        border-radius: 30px;
        color: var(--text-color-secondary);
        background: var(--color-gradient);
        box-shadow: var(--box-shadow);
        transition: background-color var(--theme-transition), color var(--theme-transition);
    }
</style>    