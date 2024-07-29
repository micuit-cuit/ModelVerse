<script>
    import Header from "$components/menu/header.svelte";
    import CardInfo from "$components/utilitise/cardInfo.svelte";
    const page = [
        {name: "Accueil", url: "/"},
        {name: "Catégories", url: "/Catégories"},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit"},
        {name: "Connexion avec Discord", url: "/discord", discord: true}
    ];

</script>
<Header items={page}/>
<CardInfo
    title="vous avez atteint une page qui n'existe pas"
    data={[
        {type: "p", content: "vous avez du vous tromper de lien, vous pouvez retourner à l'accueil ou explorer les modèles"},
        {type: "button", content: "Retour à l'accueil", url: "/"},
        {type: "button", content: "Explorer les Modèles", url: "/Produit"}
    ]}
/>