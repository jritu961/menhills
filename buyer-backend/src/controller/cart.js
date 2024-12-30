import CartService from '../services/cart.js'

const cartService = new CartService();

class CartController {

    async addItem(req, res, next) {
    console.log("🚀 ~ CartController ~ addItem ~ req:***********", req.body)

        try {
            const { deviceId, userId } = req.params
            if ((!userId || userId == "guestUser") && (!deviceId || ['null', 'undefined'].includes(deviceId))) {
                res.header("Access-Control-Allow-Origin", "*");
                return res.status(400).json({ success: false, message: "Rquired parameters are missing!" })
            }
            const result = await cartService.addItem({ ...req.body, ...req.params })
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    async getCartItem(req, res) {
        try {
          const { deviceId, userId } = req.params;
      
          console.log("🚀 ~ CartController ~ getCartItem ~ deviceId:", deviceId);
      
          // Validate input parameters
          if ((!userId || userId === "guestUser") && (!deviceId || ["null", "undefined"].includes(deviceId))) {
            return res.status(400).json({ 
              success: false, 
              message: "Required parameters are missing!" 
            });
          }
      
          // Fetch cart items from the service
          const cartItem = await cartService.getCartItem({ 
            ...req.query, 
            ...req.params 
          });
      
          // Return data in the response
          return res.status(200).json({
            success: true,
            data: cartItem
          });
        } catch (err) {
          // Handle errors and send a response
          return res.status(500).json({
            success: false,
            message: err.message || "An unexpected error occurred"
          });
        }
      }
      

    async updateItem(req, res, next) {
        try {
            return res.send(await cartService.updateItem({ ...req.body, ...req.params }));
        } catch (err) {
            next(err);
        }
    }

    async removeItem(req, res, next) {
        try {
            return res.send(await cartService.removeItem({ ...req.body, ...req.params }));
        } catch (err) {
            next(err);
        }
    }

    async clearCart(req, res, next) {
        try {
            return res.send(await cartService.clearCart({ ...req.params }));
        } catch (err) {
            next(err);
        }
    }

}

export default CartController;
