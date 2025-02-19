const { response } = require("express");
const transactionModel = require("../models/transactionModel");

const getAllTransactions = async (request, response) => {
  try {
    const transactionData = await transactionModel.find();
    response.status(200).send(transactionData);
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const addNewTransaction = async (request, response) => {
  try {
    const { transactionAmount, transactionDescription, transactionDate } =
      request.body;

    if (!transactionAmount || !transactionDescription || !transactionDate) {
      return response.status(400).json({
        success: false,
        error: "Missing required fields",
        details: {
          transactionAmount: !transactionAmount
            ? "Transaction amount is required"
            : null,
          transactionDescription: !transactionDescription
            ? "Transaction description is required"
            : null,
          transactionDate: !transactionDate
            ? "Transaction date is required"
            : null,
        },
      });
    }

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      return response.status(400).json({
        success: false,
        error: "Invalid transaction amount",
        details: "Amount must be a positive number",
      });
    }
    const date = new Date(transactionDate);
    if (isNaN(date.getTime())) {
      return response.status(400).json({
        success: false,
        error: "Invalid date format",
        details: "Please provide a valid date",
      });
    }

    const transactionData = {
      transactionAmount,
      transactionDescription,
      transactionDate
    };
    console.log(transactionData)
    const newTransaction = await transactionModel.create(transactionData);

    return response.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    response.status(500).json({ ErrorMessage: error.message });
  }
};

const editTransaction = async (request, response) => {
  try {
    const id = request.params.id;
    const { transactionAmount, transactionDescription, transactionDate } =request.body;


    if (!transactionAmount || !transactionDescription || !transactionDate) {
      return response.status(400).json({
        success: false,
        error: "Missing required fields",
        details: {
          transactionAmount: !transactionAmount
            ? "Transaction amount is required"
            : null,
          transactionDescription: !transactionDescription
            ? "Transaction description is required"
            : null,
          transactionDate: !transactionDate
            ? "Transaction date is required"
            : null,
        },
      });
    }

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      return response.status(400).json({
        success: false,
        error: "Invalid transaction amount",
        details: "Amount must be a positive number",
      });
    }

    const date = new Date(transactionDate);
    if (isNaN(date.getTime())) {
      return response.status(400).json({
        success: false,
        error: "Invalid date format",
        details: "Please provide a valid date",
      });
    }

    const transactionExists = await transactionModel.findById(id);
    if (!transactionExists) {
      return response.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
    const transactionData = {
      transactionAmount,
      transactionDescription,
      transactionDate,
    };

    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      id,
      transactionData,
      { new: true } 
    );

    return response.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {

    console.error("Error updating transaction:", error);
    return response.status(500).json({
      success: false,
      error: "Server error",
      details: error.message,
    });
  }
};


const deleteTransaction=async(request,response)=>{
    const id=request.params.id;
    console.log(id);
   const deletedTransaction =await transactionModel.findByIdAndDelete(id);
   console.log(deletedTransaction)
   return response.status(200).json({message:"Sucessfully deleted",deletedTransaction});
}


module.exports = { getAllTransactions, addNewTransaction, editTransaction, deleteTransaction};
