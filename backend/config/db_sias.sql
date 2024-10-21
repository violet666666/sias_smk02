-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Jun 2024 pada 10.01
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sias`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `tahun` int(11) NOT NULL,
  `periodeAwal` datetime NOT NULL,
  `periodeAkhir` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `uuid`, `name`, `deskripsi`, `tahun`, `periodeAwal`, `periodeAkhir`, `status`, `userId`, `createdAt`, `updatedAt`) VALUES
(2, '768e521d-b98b-4f8f-a9bd-8700656f90e0', 'Fisika', 'Kelas fisika', 2022, '2024-05-02 00:00:00', '2024-05-21 00:00:00', 'Aktif', 3, '2024-05-02 16:19:10', '2024-05-02 16:19:10'),
(4, '1ea91890-04b7-46c3-98b8-e4eec00484c8', 'dasar program', 'tugas flowchart', 2024, '2024-06-27 00:00:00', '2024-08-16 00:00:00', 'Aktif', 4, '2024-06-26 19:13:46', '2024-06-26 19:13:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('0OVfiQTttzoYdVakmD65E7C0USvE6vlQ', '2024-06-27 18:19:54', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:19:54', '2024-06-26 18:19:54'),
('1q6pUzFCATTAqPZD8xJN-i1ec1zFeeUe', '2024-06-28 07:45:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"0f071003-8d4a-4bd0-8b74-cd9b0f4ad488\"}', '2024-06-26 12:55:49', '2024-06-27 07:45:43'),
('2tgrfOUMrquVOFUbqLhhH1SwJ-WDbYdp', '2024-06-28 07:55:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:55:33', '2024-06-27 07:55:33'),
('5IrRhkhtY_ARQziI3QTVvKW7iePeS6Q2', '2024-06-27 13:18:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:18:21', '2024-06-26 13:18:21'),
('61zamZlpbCXGnaPbgPoZt2kC_2g50mIc', '2024-06-27 22:31:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:31:09', '2024-06-26 22:31:09'),
('7hbib6jfXBfFfzYu_m7gXL9ltLW1k93V', '2024-06-27 13:14:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:14:47', '2024-06-26 13:14:47'),
('81K6x7JHR1E8amcnJBZyBOzuReha9Rd4', '2024-06-27 13:40:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:40:29', '2024-06-26 13:40:29'),
('8bKBggi2YZFYpQLDjjoViBcBNrPvpvq2', '2024-06-27 13:16:51', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:16:51', '2024-06-26 13:16:51'),
('8LJPld2ckRa2ulCA8m60eb-_sYrxNMas', '2024-06-27 18:24:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:24:30', '2024-06-26 18:24:30'),
('9RmraFhnbE5_RmNJ7QrqmWIo3Vm6JtOY', '2024-06-27 13:11:20', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:11:20', '2024-06-26 13:11:20'),
('ACMNZDhvL0t6jo-OelrnbIZQiwpXVJIg', '2024-06-27 18:18:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:18:04', '2024-06-26 18:18:04'),
('aGSxyFLeSdbo7-l4fxUmVgEz7BYkB5_r', '2024-06-27 18:15:32', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:15:32', '2024-06-26 18:15:32'),
('bNTzZqz_dtL4BrxSdMsAY5BfLDTPhqQ7', '2024-06-27 18:19:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:19:30', '2024-06-26 18:19:30'),
('BybpvMu1_V-cE_bhm4IXj4xC3ylzpTN4', '2024-06-27 17:52:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 17:52:01', '2024-06-26 17:52:01'),
('c2ALi6N0YYw4P6FrLAYV7vCBE3cDSzT4', '2024-06-27 16:01:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 16:01:52', '2024-06-26 16:01:52'),
('c9lgZIX2TnhVCq028kOwQywO_JTPnr-f', '2024-06-28 07:58:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:45:57', '2024-06-27 07:58:50'),
('CL4qD1Ld1GpecLoFNz-4gxwZFD4WPo43', '2024-06-27 13:11:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:11:08', '2024-06-26 13:11:08'),
('CNlfHfwq_vJYt5tlbU32TrT97qHnp1xb', '2024-06-27 13:09:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:09:09', '2024-06-26 13:09:09'),
('dh7w8xEjHRyjH1ZmWbMJ8QM-8BbgOAQA', '2024-06-27 22:13:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:13:07', '2024-06-26 22:13:07'),
('DTefHhNCKqRVgjNLfyc_hFjbcLshPscE', '2024-06-27 22:40:19', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:40:19', '2024-06-26 22:40:19'),
('ebBrG6sfqK21f8nSzaUtKeB_18HzhYZv', '2024-06-27 12:57:16', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 12:57:16', '2024-06-26 12:57:16'),
('f3iPZyJWzi0sBeMB5xC1qP262GNSIthG', '2024-06-27 22:33:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:33:26', '2024-06-26 22:33:26'),
('fH19sVmgK7gdCLo8DJKSPdopHVJXgOJw', '2024-06-27 18:17:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:17:14', '2024-06-26 18:17:14'),
('gLXwquoXnGFo5l4q2jFIOJZcmroWeBMc', '2024-06-28 07:35:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:35:21', '2024-06-27 07:35:21'),
('gmWqf8CvdftP6au7bk3bkTcYxU7c79-n', '2024-06-27 19:46:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 19:46:12', '2024-06-26 19:46:12'),
('I1i0se1XJh44mrIMOukE9JEjpbiTtxgD', '2024-06-27 18:22:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:22:29', '2024-06-26 18:22:29'),
('IYJL-3i94YmV29qRXfT-7iFBar2uaYai', '2024-06-27 13:17:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:17:37', '2024-06-26 13:17:37'),
('JbAR5dzCey1iUH6Ku9lLLLdSDzR58d5R', '2024-06-27 13:14:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:14:34', '2024-06-26 13:14:34'),
('KtHaW4MTxDn82pYamB3KgDEZiVX-4tgC', '2024-06-27 19:13:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 19:13:41', '2024-06-26 19:13:41'),
('kWiTO2r3LiQ0xJiiGmBDwJpWycMt4kQH', '2024-06-27 19:13:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 19:13:03', '2024-06-26 19:13:03'),
('L6_D1RaadfhKo6W2oVqKAZUlNpd-yjrM', '2024-06-27 12:59:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 12:59:45', '2024-06-26 12:59:45'),
('lPBc3dE6Ai_oocPYaurudqfMhN6_gsfR', '2024-06-27 22:13:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:13:15', '2024-06-26 22:13:15'),
('LqoTFpAq6CFWrJ5OFuh7gKzdJMs0WMYN', '2024-06-28 07:55:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"29d1ecfb-ee1d-41fa-ac93-50631f4e6c12\"}', '2024-06-27 07:55:34', '2024-06-27 07:55:37'),
('Lqu0VkjKcF4-wACN0e9BpJwaz-zNXVff', '2024-06-27 13:00:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:00:04', '2024-06-26 13:00:04'),
('lZRglcpca0CfMvD7qqx_NnliTygnCQ46', '2024-06-28 07:34:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:34:43', '2024-06-27 07:34:43'),
('mLu7y_BQR46Z1xSBmMr8gcTY_Rk-Y7z4', '2024-06-27 13:18:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:18:55', '2024-06-26 13:18:55'),
('N3H-OIQrb3E22rCdnbPu5ry8PMN8hr0z', '2024-06-27 13:19:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:19:07', '2024-06-26 13:19:07'),
('NBCYYt-iH9m6XF6G5t8Dkg1fQgfaVVVB', '2024-06-27 16:06:46', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 16:06:46', '2024-06-26 16:06:46'),
('nlOkKXaJZaP1xIa20As9senYOgkARkSr', '2024-06-27 13:14:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:14:41', '2024-06-26 13:14:41'),
('NlVuNZuwtM2SMLDtMmHQsmMpa2Ag3NE1', '2024-06-27 22:29:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:29:43', '2024-06-26 22:29:43'),
('nW6tklWv1UIMzCpydgiuXIJw9BZspQA5', '2024-06-27 18:23:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:23:45', '2024-06-26 18:23:45'),
('p-_O1OF1SE8bMTtEwU2r-8rehus_ElFd', '2024-06-27 22:39:56', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:39:56', '2024-06-26 22:39:56'),
('pAYtRGoP6lzvgKDIalR7gcQRYByZgALS', '2024-06-27 18:23:28', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:23:28', '2024-06-26 18:23:28'),
('PfDFxH5hlxbsdk1H70uHLZLdyA8Dwa54', '2024-06-27 18:19:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:19:10', '2024-06-26 18:19:10'),
('PkIIbiAOyLpNZwVjFoNCnGH5V3x7evrU', '2024-06-27 08:31:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 08:31:52', '2024-06-26 08:31:52'),
('p_m_VHEDKkD7A7sqEdMqckX_PaZGtXBS', '2024-06-27 22:25:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:25:52', '2024-06-26 22:25:52'),
('q5CJXhAkhrgHlT3MLVV6mI7kx9fWrZBQ', '2024-06-27 16:02:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 16:02:03', '2024-06-26 16:02:03'),
('QIPBMpqQhh6vhwhr3-lhkC1S4ibOtZKI', '2024-06-27 13:05:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:05:14', '2024-06-26 13:05:14'),
('QKwiJ_eCiVTkuUoUaPYxT3hSur_Bcoc0', '2024-06-27 22:40:28', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:40:28', '2024-06-26 22:40:28'),
('qlQAzrCuq3i12N2nGqITiUrUFEXCuSod', '2024-06-27 22:41:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:40:34', '2024-06-26 22:41:09'),
('QQ6Q6ImHEi1Zo6lMJZ9bHfj0joR6ZQLJ', '2024-06-27 13:04:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:04:50', '2024-06-26 13:04:50'),
('tcXrgLbgAP8BPp0XN7nErwOMEAbXiyen', '2024-06-27 13:20:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:20:08', '2024-06-26 13:20:08'),
('TeV7EYmuJkU3-tuzrHAo9yM5BlMQY1h8', '2024-06-27 15:38:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 15:38:03', '2024-06-26 15:38:03'),
('TnADYtpTrbOsizJ8Lqju0S1cYccd017H', '2024-06-27 19:13:46', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 19:13:46', '2024-06-26 19:13:46'),
('ToRC12Fq3g-28ayeHAVHimpBx5F3WbdL', '2024-06-27 19:22:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 19:22:29', '2024-06-26 19:22:29'),
('ttuP1oiR25S6IyGqdqyHcqdf2TEjx6hm', '2024-06-27 23:00:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 23:00:30', '2024-06-26 23:00:30'),
('unK8SY_N21MQGDR714Cv2WhNWhvvLIBJ', '2024-06-27 13:17:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:17:05', '2024-06-26 13:17:05'),
('UOH_nta3W-oNugSII9re19StL_sFGlIB', '2024-06-27 18:23:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:23:04', '2024-06-26 18:23:04'),
('vBnu0tIeztAEs7DZ7bHKb2ga2JBfDH0C', '2024-06-27 22:39:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:39:12', '2024-06-26 22:39:12'),
('VIDKz-pof8ThUgejxaaIgt4GnCHSOY-M', '2024-06-27 13:40:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:40:40', '2024-06-26 13:40:40'),
('vkf6b8lM8kb7OP8KXK1f9AgDcToY1SX2', '2024-06-27 22:31:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:31:21', '2024-06-26 22:31:21'),
('vLourruKW_6at1wIWZs9wiv5ZjjAemuS', '2024-06-27 22:59:25', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:59:25', '2024-06-26 22:59:25'),
('vtd3q3pAF_pUDRqVTMzUDdHwMW95poqH', '2024-06-27 18:16:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:16:37', '2024-06-26 18:16:37'),
('wTuMhbMvc_0rVDRiVwPRlSc9kj1Cy9jl', '2024-06-28 07:55:23', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:55:23', '2024-06-27 07:55:23'),
('wVLWYKDJMfrHZRkT-g0V3I8aNYkkV6rT', '2024-06-27 22:30:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:30:52', '2024-06-26 22:30:52'),
('xAByepw5nos2trfK2nHzpwZQnIzM_lb5', '2024-06-28 07:34:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:34:57', '2024-06-27 07:34:57'),
('xCnbyZNE7ny2TY1vw_zUrWM-OUWxkddf', '2024-06-27 13:10:06', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:10:06', '2024-06-26 13:10:06'),
('xmxo8UNNJ2IJWA_d2_k8Vg1HIdu8Dl4J', '2024-06-27 13:08:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:08:52', '2024-06-26 13:08:52'),
('xSFJGwmPmgAptKX6Mn4KZfJO_QcVlg_K', '2024-06-27 13:05:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:05:57', '2024-06-26 13:05:57'),
('y56EU6SCdxSiHN4ODvCqjuinQ14TaIM7', '2024-06-27 15:46:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 15:46:57', '2024-06-26 15:46:57'),
('ye7e_yM9yzlAzCzUFco3wmQ4gCJbObUr', '2024-06-27 22:40:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 22:40:40', '2024-06-26 22:40:40'),
('yXzmS8ZCaHnXeEMd5TLC0eDrj8u9t2vw', '2024-06-27 13:09:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:09:57', '2024-06-26 13:09:57'),
('YyaL4CyPmzZmUVVGa7knnNZvv9jJCB-i', '2024-06-28 07:55:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:55:07', '2024-06-27 07:55:07'),
('z8VkTBvFSa_GGN5eTgVXKXzs5YZiqHxl', '2024-06-27 08:27:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 08:27:14', '2024-06-26 08:27:14'),
('_dZHygK7APR5ZBK2NMz0biShtNQJYsQa', '2024-06-27 18:16:20', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 18:16:20', '2024-06-26 18:16:20'),
('_F6jE_90AUgn_KadbWOtQuLSEC9in7zA', '2024-06-27 16:06:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 16:06:58', '2024-06-26 16:06:58'),
('_oHQw0WvFAnNFLu2SWcKWY_PBc8sjq2E', '2024-06-28 07:35:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-27 07:35:12', '2024-06-27 07:35:12'),
('_ZM-CiOErmOgbvXcaV3J3nzQbUDM9qa4', '2024-06-27 13:19:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-06-26 13:19:50', '2024-06-26 13:19:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `due_date` datetime NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `due_date`, `class_id`) VALUES
(1, 'apa aja', 'apa aja dsdkasl', '2018-11-13 00:00:00', 1),
(2, 'apa aja', 'apa aja dsdkasl', '2018-11-13 00:00:00', 1),
(3, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(4, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(5, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(6, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(7, 'apa aja', 'apa aja dsdkasl', '2018-11-13 00:00:00', 1),
(8, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(9, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(10, 'tugas ptia', 'buat flowchart', '2024-06-28 00:00:00', 0),
(11, 'tugas ptia', 'buat flowchart', '2024-06-13 00:00:00', 0),
(12, 'tugas ptia', 'buat flowchart', '2024-06-13 00:00:00', 0),
(13, 'tugas ptia', 'buat flowchart', '2024-06-13 00:00:00', 0),
(14, 'apa aja', 'apa aja dsdkasl', '2018-11-13 00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nomorInduk` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `nomorInduk`, `role`, `createdAt`, `updatedAt`) VALUES
(3, '29d1ecfb-ee1d-41fa-ac93-50631f4e6c12', 'tegar alfalakh', 'tegaralfalakh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$5l3FjD/hOl1ZpK7AnyhSSg$qsw/NzhQmUIl9IzZdzHScpOyJEjXubCoNTZgOfvhuXY', '1052190123', 'admin', '2024-05-02 16:07:30', '2024-05-02 16:07:30'),
(4, '0f071003-8d4a-4bd0-8b74-cd9b0f4ad488', 'hafizh fuqaha', 'hafizh@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$FpnoicZL2eRDdRjkez2POA$tVoENGJz5qgTwvn2vdJ04SmU0NWGQmUyD4X8uaxeUeY', '105219030', 'guru', '2024-05-02 16:25:17', '2024-05-02 16:25:17'),
(5, '4eb1423b-758c-44ed-a667-ebab34b7bdcd', 'nabil farras', 'nabilfarras@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$zzXx3ryQBstw6pQ7laxRsQ$5W5tZgKS2ffPXjB/ejOG1weSiTS7uiogxf9dMVWO2ic', '105219064', 'user', '2024-05-02 16:31:29', '2024-05-02 16:31:29'),
(6, 'b3086201-b931-4331-abda-3df6a9641293', 'mahran zhafir', 'nabilfarras@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$cZPJfFCxubDnKkkOv0NqKA$gIuEDXHWDEg+uxfCCqqU7HNQH+RnMYYCbo8h9m4YNAw', '1052190123', 'admin', '2024-05-02 16:32:26', '2024-05-02 16:32:26');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
