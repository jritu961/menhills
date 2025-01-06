import OrderModel from "../model/order.js";



export async function getOrdersHandler(req, res) {
    try {
        const apiKey = req.headers['wil-api-key'];

        if (apiKey !== process.env.WIL_API_KEY) {
            return res.status(401).send('Missing or wrong wil-api-key header');
        }

        const { limit = 100, page = 1, state } = req.query;
        const limitValue = parseInt(limit);
        const pageValue = parseInt(page);
        const skip = (pageValue - 1) * limitValue;

        // Query Orders based on page limit, state, and is_order_confirmed
        let query = { is_order_confirmed: true };

        if (state) {
            const states = state.split(',');
            query.fulfillment_state = { $in: states };
        }

        const orderCount = await OrderModel.countDocuments(query);
        const orders = await OrderModel.find(query)
            .skip(skip)
            .limit(limitValue)
            .sort({ createdAt: -1 });

        const orderData = await Promise.all(orders.map(async (order) => {
            const { _id, transactionId, context, createdAt, updatedAt, state, quote, items, id, fulfillments,
                settle_status, settlement_id, settlement_reference_no, order_recon_status, counterparty_recon_status,
                counterparty_diff_amount_value, counterparty_diff_amount_currency, receiver_settlement_message, receiver_settlement_message_code, customer,
                updatedQuote, payment } = order;

            const orderFulfillmentData = fulfillments.filter(data => data?.orderId === id);
            const fulfillment_state = orderFulfillmentData.length ? orderFulfillmentData[orderFulfillmentData.length - 1] : {};
            const logistics_details = fulfillments.find(fulfillment => fulfillment?.agent) || {};

            return {
                id: id || _id,
                order_id: _id,
                transaction_id: transactionId,
                buyer_order_id: _id,
                domain: context?.domain || "ONDC:RET18",
                bpp_uri: context?.bpp_uri || "",
                bpp_id: context?.bpp_id || "",
                bap_uri: context?.bap_uri || "",
                bap_id: context?.bap_id || "",
                settlement_id,
                settlement_reference_no,
                order_recon_status,
                counterparty_recon_status,
                counterparty_diff_amount_value,
                counterparty_diff_amount_currency,
                receiver_settlement_message,
                receiver_settlement_message_code,
                created_at: createdAt,
                order_status: state || "Accepted",
                quote,
                updatedQuote,
                payment,
                updated_at: updatedAt,
                fulfillment_state: fulfillment_state?.state || 'Pending',
                customer: {
                    id: customer?._id,
                    person: customer?.person || {},
                    contact: customer?.contact || {},
                },
                logistics_details,
                items: items.map(({ id, product, quantity }) => ({
                    sku: id,
                    name: product?.descriptor?.name,
                    price: product?.price?.value,
                    quantity: quantity?.count,
                })),
                return_window: '@ondc/org/return_window',
                payment_type: 'PREPAID',
                shopify_order_status: 'unfulfilled',
                replaced_with_order_id: null,
                replaced_order_details: null,
                settlement_type: settle_status || 'Pending',
                returns: null,
            };
        }));

        const paginatedData = orderData.slice(0, limitValue);

        res.send({
            success: true,
            data: paginatedData,
            count: orderCount,
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ success: false, message: "Error fetching orders" });
    }
}
