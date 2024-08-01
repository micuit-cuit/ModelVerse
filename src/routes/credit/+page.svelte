<script>
    import Header from "$components/menu/header.svelte";
    import License from "$components/menu/license.svelte";
    const page = [
        {name: "Accueil", url: "/"},
        {name: "Catégories", url: "/Catégories"},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit", check: true},
        {name: "Connexion avec Discord", url: "https://discord.com/oauth2/authorize?client_id=1268504553276313640&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin&scope=identify+email", discord: true}
    ];
    let licenseListe = [
        {product: "Day and Night Toggle", author: "dbruening", url: "https://codepen.io/justNeku/pen/RwqLvOx?editors=1100", license: "MIT"}
    ];
</script>
<Header items={page}/>

{#each licenseListe as license}
    <License {...license}/>
{/each}
