import {
  _fetchBreeds,
  _getDogBreedsFromArray,
  _getCatBreedsFromArray,
} from "../pet";

describe("pet service", () => {
  describe("_fetchBreeds", () => {
    const mockFetch = jest.fn();

    beforeAll(() => {
      global.fetch = mockFetch;
    });

    afterAll(() => {
      mockFetch.mockRestore();
    });

    afterEach(() => mockFetch.mockReset());

    it("returns null on http connection error", async () => {
      mockFetch.mockImplementation(() => {
        throw Error("mock http connection error");
      });
      const res = await _fetchBreeds();
      expect(res).toEqual(null);
    });

    it("returns call to json()", async () => {
      mockFetch.mockReturnValue({ ok: true, json: () => ({ data: "test" }) });
      const data = await _fetchBreeds();
      expect(data.data).toEqual("test");
    });
  });

  describe("_getDogBreeds", () => {
    it("returns array of dog breed objects", () => {
      const breeds = _getDogBreedsFromArray([
        { id: 1, name: "breed1", animal: "cat" },
        { id: 2, name: "breed2", animal: "dog" },
        { id: 3, name: "breed3", animal: "dog" },
      ]);
      expect(breeds).toHaveLength(2);
      breeds.forEach((breed) => {
        expect(breed.animal).toEqual("dog");
      });
    });
  });

  describe("_getCatBreeds", () => {
    it("returns array of cat breed objects", () => {
      const breeds = _getCatBreedsFromArray([
        { id: 1, name: "breed1", animal: "cat" },
        { id: 2, name: "breed2", animal: "dog" },
        { id: 3, name: "breed3", animal: "cat" },
      ]);
      expect(breeds).toHaveLength(2);
      breeds.forEach((breed: any) => {
        expect(breed.animal).toEqual("cat");
      });
    });
  });
});
