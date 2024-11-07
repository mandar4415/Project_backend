const mongoose = require("mongoose");

// Define the schema for the Maintenance model
const maintenanceSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
      trim: true, // Automatically trims whitespace
    },
    dateOfService: {
      type: Date,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: [0, "Cost cannot be negative"], // Enforce non-negative cost
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Reference to the Item model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Add an index to itemId for better query performance
maintenanceSchema.index({ itemId: 1 });

// Create the model using the schema
const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
