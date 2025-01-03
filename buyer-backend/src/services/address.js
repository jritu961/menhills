import { v4 as uuidv4 } from "uuid";

import DeliveryAddressMongooseModel from "../model/address.js";

class DeliveryAddressService {
  /**
   * add delivery address
   * @param {Object} request
   * @param {Object} user
   */
  async deliveryAddress(request = {}, user = {}) {
    console.log("🚀 ~ DeliveryAddressService ~ deliveryAddress ~ request:", request)
    console.log("🚀 ~ DeliveryAddressService ~ deliveryAddress ~ user:13", user)
    try {
      const deliveryAddressSchema = {
        userId: user?.decodedToken?.uid,
        id: uuidv4(),
        descriptor: request?.descriptor,
        gps: request?.gps,
        defaultAddress: true,
        address: request?.address,
        lat: request?.lat,
        lng: request?.lng,
      };

      await DeliveryAddressMongooseModel.updateMany(
        { userId: user.decodedToken.uid },
        { defaultAddress: false }
      );

      let storedDeliveryAddress = await DeliveryAddressMongooseModel.create({
        ...deliveryAddressSchema,
      });
      storedDeliveryAddress = storedDeliveryAddress?.toJSON();

      return {
        id: storedDeliveryAddress?.id,
        descriptor: storedDeliveryAddress?.descriptor,
        gps: storedDeliveryAddress?.gps,
        defaultAddress: storedDeliveryAddress?.defaultAddress,
        address: storedDeliveryAddress?.address,
        lat: storedDeliveryAddress?.lat,
        lng: storedDeliveryAddress?.lng,
      };
    } catch (err) {
      throw err;
    }
  }

  /**
   * get delivery address
   * @param {Object} user
   */
  async onDeliveryAddressDetails(user = {}) {
    try {
      const userId = user?.decodedToken?.uid ? user?.decodedToken?.uid : (user?.decodedToken?.user_id || user?.decodedToken?.userId)
      console.log("🚀 ~ DeliveryAddressService ~ onDeliveryAddressDetails ~ userId:", userId)
      const deliveryAddressDetails = await DeliveryAddressMongooseModel.find({
        userId: userId, address: { $ne: null },
      });
      console.log("🚀 ~ DeliveryAddressService ~ onDeliveryAddressDetails ~ deliveryAddressDetails:", deliveryAddressDetails)

      return deliveryAddressDetails;
    } catch (err) {
      throw err;
    }
  }

  /**
   * add delivery address
   * @param {String} id
   * @param {Object} request
   * @param {String} userId
   */
  async updateDeliveryAddress(id, request = {}, userId) {
    try {
      const deliveryAddressSchema = {
        descriptor: request?.descriptor,
        gps: request?.gps,
        defaultAddress: request?.defaultAddress,
        address: request?.address,
        lat: request?.lat,
        lng: request?.lng,
      };

      if (request?.defaultAddress)
        await DeliveryAddressMongooseModel.updateMany(
          { userId: userId },
          { defaultAddress: false }
        );

      let storedDeliveryAddress =
        await DeliveryAddressMongooseModel.findOneAndUpdate(
          { id: id },
          { ...deliveryAddressSchema },
          {
            returnDocument: "after",
          }
        );
      storedDeliveryAddress = storedDeliveryAddress?.toJSON();
      console.log("🚀 ~ DeliveryAddressService ~ updateDeliveryAddress ~ storedDeliveryAddress:", storedDeliveryAddress)

      if (storedDeliveryAddress)
        return {
          id: storedDeliveryAddress?.id,
          descriptor: storedDeliveryAddress?.descriptor,
          gps: storedDeliveryAddress?.gps,
          defaultAddress: storedDeliveryAddress?.defaultAddress,
          address: storedDeliveryAddress?.address,
          lat: storedDeliveryAddress?.lat,
          lng: storedDeliveryAddress?.lng,
        };
     
    } catch (err) {
      throw err;
    }
  }

  async deleteDeliveryAddress(id) {
    console.log("🚀 ~ DeliveryAddressService ~ deleteDeliveryAddress ~ id:", id)
    try {
      const deliveryAddressDetails =
        await DeliveryAddressMongooseModel.deleteOne({ _id: id });
        console.log("🚀 ~ DeliveryAddressService ~ deleteDeliveryAddress ~ deliveryAddressDetails:", deliveryAddressDetails)

      if (deliveryAddressDetails.deletedCount === 0) {
        return "Delivery address not found or already deleted."

      }

      return deliveryAddressDetails;
    } catch (err) {
      console.error("Error deleting delivery address:", err);
      throw err;
    }
  }
}

export default DeliveryAddressService;
