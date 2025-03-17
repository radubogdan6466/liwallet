import Dexie from "dexie";
import { format } from "date-fns";

// Definirea schemei bazei de date
const db = new Dexie("MyDatabase");
db.version(1).stores({
  transactions: "++id,amount,chain,gasPrice,toAddress,token,txHash,timestamp",
});

// Funcția pentru a adăuga o tranzacție în baza de date
export const addTransaction = async (transactionDetails) => {
  try {
    transactionDetails.timestamp = new Date().toISOString();
    await db.transactions.add(transactionDetails);
    console.log("Tranzacție adăugată în IndexedDB:", transactionDetails);
  } catch (error) {
    console.error("Eroare la adăugarea tranzacției în IndexedDB:", error);
  }
};
export const getAllTransactionsByChain = async (selectedChain) => {
  try {
    const transactions = await db.transactions
      .where("chain")
      .equals(selectedChain)
      .toArray();

    console.log(
      `Toate tranzacțiile pentru lanțul ${selectedChain}:`,
      transactions
    );
    return transactions;
  } catch (error) {
    console.error(
      `Eroare la preluarea tranzacțiilor pentru lanțul ${selectedChain} din IndexedDB:`,
      error
    );
    throw error;
  }
};
