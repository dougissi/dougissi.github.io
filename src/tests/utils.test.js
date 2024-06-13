import { convertToId } from "../utils";

it('convertToId: HaleyIssi.com Embedding', () => {
    const heading = 'HaleyIssi.com Embedding';
    const expected = 'haleyissicom-embedding';
    const actual = convertToId(heading);
    expect(actual).toEqual(expected);
})
