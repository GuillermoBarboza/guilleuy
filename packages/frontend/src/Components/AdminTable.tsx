import { useState, useEffect } from "react";
import { Table, Checkbox, ScrollArea, Group, Text, rem } from "@mantine/core";
import { IconNotes, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export function AdminTable({ data, headers, edit, deleteItem }) {
  const [selection, setSelection] = useState(["1"]);
  const { setItemId } = useAppContext();

  const nav = useNavigate();

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      data.length > 0 && current.length === data.length
        ? []
        : data.map((item, index) => "row" + index)
    );

  const rows =
    data.length >= 1
      ? data.map((item, index) => {
          const selected = selection.includes("row" + index);
          return (
            <Table.Tr
              id={"row" + index}
              key={"row" + index}
              className={selected ? `bg-blue-100` : ``}
            >
              <Table.Td>
                <Checkbox
                  checked={selection.includes("row" + index)}
                  onChange={() => toggleRow("row" + index)}
                />
              </Table.Td>
              {headers.map((key, index) => {
                return (
                  <Table.Td>
                    <Group gap="sm">
                      <Text size="sm" fw={500}>
                        {item[key]}
                      </Text>
                    </Group>
                  </Table.Td>
                );
              })}
              <Table.Td>
                <button
                  className="p-2 bg-sky-500 mx-2"
                  onClick={() => {
                    setItemId(item["productId"]);
                    nav(`/admin/tienda/${item["slug"]}`);
                  }}
                >
                  <IconNotes color="white" />
                </button>
                <button
                  className={`p-2 ${
                    selected ? "bg-rose-700" : "bg-zinc-700"
                  } mx-2`}
                  disabled={!selected}
                  onClick={() => deleteItem(item["productId"])}
                >
                  <IconTrash
                    className={`${
                      selected ? "text-rose-100" : "text-zinc-300"
                    }`}
                  />
                </button>
              </Table.Td>
            </Table.Tr>
          );
        })
      : null;

  useEffect(() => {
    //data.length > 0 && console.log("data", Object.keys(data[0]));
  }, [data]);

  return (
    <ScrollArea className="bg-neutral-300">
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            {headers.map((header) => (
              <Table.Th key={header}>{header}</Table.Th>
            ))}
            <Table.Th className="w-40 text-center">Editar / Borrar</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
