import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Function to generate a unique browser ID (Device ID)
export const generateUniqueBrowserId = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  console.log("🚀 ~ generateUniqueBrowserId ~ result:", result);

  // Store the visitorId in local storage as deviceId
  localStorage.setItem('deviceId', result.visitorId);

  return result.visitorId;
};

// Function to get or create the device ID
export const getOrCreateDeviceId = async () => {
  let deviceId = localStorage.getItem('deviceId');

  if (deviceId === null) {
    const randomID = await generateUniqueBrowserId();
    localStorage.setItem('deviceId', randomID);
    deviceId = randomID;
  }

  return deviceId;
};