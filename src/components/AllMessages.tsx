"use client";

import { trpc } from "@/app/_trpc/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";

type Props = {};

export default function AllMessages({}: Props) {
  const { data: messages, isLoading } = trpc.getPublicAllMessages.useQuery();

  return (
    <div>
      <h1>AllMessages:</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {messages != undefined && messages?.length > 0 ? (
            <>
              <Table>
                <TableCaption>A list of recent messages.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Text</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>UserId</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages?.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>{message.id}</TableCell>
                      <TableCell>{message.text}</TableCell>
                      <TableCell>{format(new Date(message.createdAt), "HH:mm")}</TableCell>
                      <TableCell>{message.userId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <p>There is no messages.</p>
          )}
        </>
      )}
    </div>
  );
}
