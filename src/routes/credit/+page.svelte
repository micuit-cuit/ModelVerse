<script>
    import Header from "$components/menu/header.svelte";
    import License from "$components/menu/license.svelte";
    const page = [
        {name: "Accueil", url: "/"},
        {name: "Catégories", url: "/Catégories"},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit", check: true},
        {name: "Connexion avec Discord", url: "/discord", discord: true}
    ];
    let licenseListe = [
        {product: "Day and Night Toggle", author: "dbruening", url: "https://codepen.io/justNeku/pen/RwqLvOx?editors=1100", license: "MIT"}
    ];
</script>
<Header items={page}/>

{#each licenseListe as license}
    <License {...license}/>
{/each}
