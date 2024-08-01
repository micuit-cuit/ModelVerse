<script>
    import Header from "$components/menu/header.svelte";
    const page = [
        {name: "Accueil", url: "/"},
        {name: "Catégories", url: "/Catégories", check: true},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit"},
        {name: "Connexion avec Discord", url: "https://discord.com/oauth2/authorize?client_id=1268504553276313640&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin&scope=identify+email", discord: true}
    ];

</script>
<Header items={page}/>
