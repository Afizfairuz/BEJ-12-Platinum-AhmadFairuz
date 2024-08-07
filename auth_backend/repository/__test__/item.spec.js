const ItemRepository = require("../itemRepository");

describe("createItem", () => {
  const itemRepository = new ItemRepository();
  const itemToCreate = {
    categoryId: 2,
    name: "PC",
    description: "PC high performance",
    price: 1500,
    stock: 8,
  };

  //Positive Case
  it("success: should return the created item", async () => {
    const created = await itemRepository.createItem(itemToCreate);

    await itemRepository.deleteByName(itemToCreate.name);

    expect(created.categoryId).toEqual(itemToCreate.categoryId);
    expect(created.name).toEqual(itemToCreate.name);
    expect(created.description).toEqual(itemToCreate.description);
    expect(created.price).toEqual(itemToCreate.price);
    expect(created.stock).toEqual(itemToCreate.stock);
  });

  // Negative case
  it("failed: should return error duplicate name", async () => {
    try {
      await itemRepository.createItem(itemToCreate);
      await itemRepository.createItem(itemToCreate);
    } catch (error) {
      await itemRepository.deleteByName(itemToCreate.name);

      expect(error.errors[0].message).toEqual("name must be unique");
    }
  });
});
