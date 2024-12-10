Always use Response and Message while sending data to frontend
i.e
res.send(200).json({
response: any,
message: 'success' | 'error'
})
