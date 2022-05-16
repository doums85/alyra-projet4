const NFTsDetails = `
sellable,
name,
"image": image.asset->url,
price,
ipfs,
tokeId,
slug,
metadata,
description,
endOfAuction,
collection->{
  name
},
category -> {
  categories
} ,
"senseiRef": sensei._ref,
"otakuRef": otaku._ref,
sensei-> {
  address,
  username,
  _id
},
otaku->{
  address,
  username,
  _id
},
`;

export const NFTsQuery = `*[ _type == "nft"]{
   ${NFTsDetails}
}`;

export const senseiQuery = `*[ _type == "otaku"]`;

export const bestNFTsQuery = `*[ _type == "best"]{
    nfts[]->{
      ${NFTsDetails}
    }
}`;

export const featuresQuery = `*[ _type == "features"]{
  nfts[]->{
    ${NFTsDetails}
  }
}`;

export const NFTQuery = (pageSlug) => {
  return `*[_type == "nft" && slug.current == "${pageSlug}"][0]{
    ${NFTsDetails}
  }`;
};