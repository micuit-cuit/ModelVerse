<script>
    import Header from "$components/menu/header.svelte";
    import CardInfo from "$components/utilitise/cardInfo.svelte";
    const page = [
        {name: "Accueil", url: "/", check: true},
        {name: "Catégories", url: "/Catégories"},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit"},
        {name: "Connexion avec Discord", url: "https://discord.com/oauth2/authorize?client_id=1268504553276313640&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin&scope=identify+email", discord: true}
    ];
    let title = "ModelVerse";
</script>
<Header items={page}/>

<CardInfo
    title="Bienvenue sur le meilleur site de modèles personnalisables !",
    data={[
        {type: "button", content: "Explorer les Modèles", url: "/Produit"}
    ]}
/>

<CardInfo
    title="Bienvenue sur le meilleur site de modèles personnalisables !",
    data={[
        {type: "button", content: "Explorer les Modèles", url: "/Produit"}
    ]}
/>

<CardInfo
    title="Bienvenue sur le meilleur site de modèles personnalisables !",
    data={[
        {type: "button", content: "Explorer les Modèles", url: "/Produit"}
    ]}
/>

