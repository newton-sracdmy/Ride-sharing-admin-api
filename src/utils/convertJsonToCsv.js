const formatDate = (date) => {
    if (!date || isNaN(new Date(date))) return 'N/A'; 
    return new Date(date).toISOString().split("T")[0];
};

exports.convertToCSV = (data) => {
    const headers = [
        'Invoice Number',
        'Transaction Id',
        'Bank Transaction Id',
        'Customer Name',
        'Date',
        'Amount',
        'Payment Status',
        'Transaction Details Status',
        'Store Amount',
        'Currency',
        'Card Type',
        'Card Number',
        'Card Issuer',
        'Card Brand',
        'Card Category',
        'Card Sub Brand',
        'Card Issuer Country',
        'Card Issuer Country Code',
        'Base Fare',
        'Risk Title',
        'Risk Level',
        'Discount Percentage',
        'Discount Amount',
        'Discount Remarks'
    ];

    const escapeCSV = (value) => {
        if (value === null || value === undefined) return '';
        let str = String(value).replace(/"/g, '""'); 
        str = str.replace(/\r?\n|\r/g, ' '); 
        return str.includes(',') || str.includes('"') ? `"${str}"` : str;
    };

    const rows = data.map(payment => {
        let row = [
            escapeCSV(payment?.get('invoiceNumber') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('tran_id') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('bank_tran_id') || 'N/A'),
            escapeCSV(payment?.user?.name || 'N/A'),
            escapeCSV(formatDate(payment?.createdAt)),
            escapeCSV(payment?.amount || '0'),
            escapeCSV(payment?.status || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('status') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('store_amount') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('currency') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_type') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_no') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_issuer') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_brand') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_category') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_sub_brand') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_issuer_country') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('card_issuer_country_code') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('base_fair') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('risk_title') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('risk_level') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('discount_percentage') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('discount_amount') || 'N/A'),
            escapeCSV(payment?.transactionDetails?.get('discount_remarks') || 'N/A')
        ];

        if (payment?.ride) {
            headers.push('Ride Status', 'Booking ID');
            row.push(
                escapeCSV(payment?.ride?.status || 'N/A'),
                escapeCSV(payment?.ride?.bookingNumber || 'N/A')
            );
        }

        if (payment?.ticket) {
            headers.push('Ticket fare', 'Ticket pnr', 'Seat', 'Ticket Status', 'Ticket expiry date', 'Ticket created date');
            row.push(
                escapeCSV(payment?.ticket?.fare || 'N/A'),
                escapeCSV(payment?.ticket?.pnr || 'N/A'),
                escapeCSV(payment?.ticket?.seat || 'N/A'),
                escapeCSV(payment?.ticket?.status || 'N/A'),
                escapeCSV(formatDate(payment?.ticket?.expiredAt) || 'N/A'),
                escapeCSV(formatDate(payment?.ticket?.createdAt) || 'N/A')
            );
        }
        if (payment?.ticket?.coach) {
            headers.push('Coach Name', 'Coach Company', 'Coach date', 'Coach time', 'Coach from', 'Coach to', 'Departure Point', 'Coach Number', 'Coach Status', 'Coach fare', 'Coach Manager Number', 'Coach expiry date', 'Coach created date');
            row.push(
                escapeCSV(payment?.ticket?.coach?.name || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.company || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.date || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.time || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.from || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.to || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.departurePoint || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.coachNumber || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.status || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.fare || 'N/A'),
                escapeCSV(payment?.ticket?.coach?.managerNumber || 'N/A'),
                escapeCSV(formatDate(payment?.ticket?.coach?.expiredAt) || 'N/A'),
                escapeCSV(formatDate(payment?.ticket?.coach?.createdAt) || 'N/A')
            );
        }

        return row;
    });

    const uniqueHeaders = [...new Set(headers)];

    const csvContent = [
        uniqueHeaders.join(','), 
        ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
};
