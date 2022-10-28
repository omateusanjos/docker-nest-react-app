import React from "react";
import {
  getKeys,
  readFileAndRetornJSON,
  getRows,
  parserToTable,
  isTXT,
} from "../utils/form";

describe("FormUtils", () => {
  const text =
    "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS";

  const resultExpected = [
    {
      date: "2022-01-15",
      product: "CURSODEBEMESTAR",
      seller: "JOSECARLOS",
      type: 1,
      value: "0000012750",
    },
  ];

  it("readFileAndRetornJSON ", async () => {
    const read = await readFileAndRetornJSON(text);

    expect(read).toEqual(resultExpected);
  });

  it("getKeys", () => {
    const read = getKeys(resultExpected);

    expect(read).toHaveLength(5);
  });

  it("getKeys", () => {
    const read = getRows(resultExpected);

    expect(read).toHaveLength(1);
  });

  it("parserToTable", () => {
    const columns = getKeys(resultExpected);
    const rows = getRows(resultExpected);
    const table = parserToTable(resultExpected);
    const result = {
      columns: columns,
      data: rows,
    };
    expect(table).toEqual({ ...result });
  });

  it("IsTXT", () => {
    const file = new File([""], "file.txt", { type: "text/plain" });
    const isTxt = isTXT(file);
    expect(isTxt).toBeTruthy();
  });
});
