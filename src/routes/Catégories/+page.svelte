<script>
    import Header from "$components/menu/header.svelte";
    const page = [
        {name: "Accueil", url: "/"},
        {name: "Catégories", url: "/Catégories", check: true},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit"},
        {name: "Connexion avec Discord", url: "/discord", discord: true}
    ];

</script>
<Header items={page}/>
