const NFTsDetails = `
sellable,
name,
"image": image.asset->url,
price,
ipfs,
tokeId,
metadata,
description,
endOfAuction,
collection->{
  name
},
category -> {
  categories
} ,
sensei-> {
  address,
  username,
},
otaku->{
  address,
  username,
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