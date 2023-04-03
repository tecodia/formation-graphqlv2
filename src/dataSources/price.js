import DataLoader from 'dataloader';

export class PriceDataSource {
  constructor(knexConnection, cache) {
    this.knexConnection = knexConnection;
    this.cache = cache;
  }

  batchGetPriceByProductId = new DataLoader(async (productIds) => {
    const prices = await this.knexConnection('price').select().whereIn('product_id', productIds);

    return productIds.map((productId) =>
      prices.find((price) => parseInt(price.product_id, 10) === parseInt(productId, 10))
    );
  });

  async getPriceByProductId(productId) {
    const price = await this.cache.get(`getPriceByProductId-${productId}-v2`);
    if (price) {
      return price;
    }
    const priceDataloader = await this.batchGetPriceByProductId.load(productId);

    await this.cache.set(`getPriceByProductId-${productId}-v2`, priceDataloader, { ttl: 10 });

    return priceDataloader;
  }

  async addPrice(price) {
    const [id] = await this.knexConnection('price')
      .insert({
        amount: price.amount,
        product_id: price.productId[0].id,
      })
      .returning('id');
    return {
      ...price,
      id,
    };
  }
}
