export const toan7_tests = [
  // ==========================================
  // ĐỀ SỐ 01
  // ==========================================
  {
    test_id: "toan7_de01",
    title: "Toán 7 - Đề Số 01 (Giữa Kỳ 1)",
    subject: "toan",
    term: "HK1_GiuaKy",
    time_limit_minutes: 60,
    is_active: true,
    questions: [
      // Trắc nghiệm
      {
        id: "toan7_de01_tn_01",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 1. Tập hợp các số hữu tỉ được kí hiệu là",
        options: ["A. Z", "B. Q", "C. N", "D. R"],
        answer: 1,
        explanation: "Tập hợp các số hữu tỉ được kí hiệu là Q."
      },
      {
        id: "toan7_de01_tn_02",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 2. Khẳng định nào sau đây đúng?",
        options: ["A. -7 ∈ N", "B. 13/2 ∈ N", "C. 7/4 ∈ Q", "D. 17/4 ∈ Z"],
        answer: 2,
        explanation: "7/4 là số hữu tỉ nên 7/4 ∈ Q."
      },
      {
        id: "toan7_de01_tn_03",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 3. Phân số nào sau đây biểu diễn số hữu tỉ -3/7?",
        options: ["A. 6/14", "B. 9/(-21)", "C. 12/28", "D. (-27)/(-63)"],
        answer: 1,
        explanation: "9/(-21) = -3/7."
      },
      {
        id: "toan7_de01_tn_04",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 4. Trong các số hữu tỉ 0,75; -6; 4/5; -1 1/3, số lớn nhất là",
        options: ["A. -1 1/3", "B. 0,75", "C. -6", "D. 4/5"],
        answer: 3,
        explanation: "0,75 = 3/4 = 0,75; 4/5 = 0,8. Ta có 0,8 > 0,75 nên 4/5 là số lớn nhất."
      },
      {
        id: "toan7_de01_tn_05",
        type: "multiple_choice",
        topic: "Số thực & Căn bậc hai",
        question: "Câu 5. Dùng máy tính cầm tay tính √17 rồi làm tròn kết quả đến hàng phần trăm, ta được",
        options: ["A. 4,123", "B. 4,1", "C. 4,12", "D. 4,1231"],
        answer: 2,
        explanation: "√17 ≈ 4,123105... Làm tròn đến hàng phần trăm (chữ số thập phân thứ hai) được 4,12."
      },
      {
        id: "toan7_de01_tn_06",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 6. Kết quả của phép tính 1/6 - |2/3 - 5/4| là",
        options: ["A. -3/5", "B. 5/12", "C. 3/4", "D. -5/12"],
        answer: 3,
        explanation: "2/3 - 5/4 = -7/12 => | -7/12 | = 7/12. Ta có 1/6 - 7/12 = 2/12 - 7/12 = -5/12."
      },
      {
        id: "toan7_de01_tn_07",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 7. Kết quả của phép tính (-5/13) + (-2/11) + 5/13 + (-9/11) là",
        options: ["A. -38/143", "B. 7/11", "C. -1", "D. -7/11"],
        answer: 2,
        explanation: "[(-5/13) + 5/13] + [(-2/11) + (-9/11)] = 0 + (-11/11) = -1."
      },
      {
        id: "toan7_de01_tn_08",
        type: "multiple_choice",
        topic: "Lũy thừa",
        question: "Câu 8. x^12 không phải là kết quả của phép tính nào dưới đây?",
        options: ["A. x^18 : x^6 (x ≠ 0)", "B. x^4 . x^8", "C. (x^2)^6", "D. (x^3)^3"],
        answer: 3,
        explanation: "(x^3)^3 = x^(3*3) = x^9 ≠ x^12."
      },
      {
        id: "toan7_de01_tn_09",
        type: "multiple_choice",
        topic: "Hình học phẳng - Tiên đề Euclid",
        question: "Câu 9. Qua một điểm M nằm ngoài đường thẳng a, có bao nhiêu đường thẳng đi qua M và song song với a?",
        options: ["A. Không có", "B. Chỉ có một", "C. Có hai", "D. Có vô số"],
        answer: 1,
        explanation: "Theo tiên đề Euclid, qua một điểm ở ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó."
      },
      {
        id: "toan7_de01_tn_10",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de01_tn_c10.png",
        question: "Câu 10. Cho hình vẽ bên. Cặp góc A1 và B2 là cặp góc",
        options: ["A. đối đỉnh.", "B. so le trong.", "C. kề bù.", "D. đồng vị."],
        answer: 1,
        explanation: "A1 và B2 là cặp góc so le trong."
      },
      {
        id: "toan7_de01_tn_11",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de01_tn_c11.png",
        question: "Câu 11. Cho hình vẽ bên, biết a // b và B1 = 128°. Số đo của A1 là",
        options: ["A. 62°", "B. 75°", "C. 52°", "D. 128°"],
        answer: 2,
        explanation: "Do a // b, góc A1 và góc B1 là hai góc trong cùng phía bù nhau, do đó A1 = 180° - 128° = 52°."
      },
      {
        id: "toan7_de01_tn_12",
        type: "multiple_choice",
        topic: "Hình học phẳng - Tia phân giác",
        image: "/images/math7/toan7_de01_tn_c12.png",
        question: "Câu 12. Cho hình vẽ bên, biết BAC = 120° và AD là tia phân giác của BAC. Số đo của A1 là",
        options: ["A. 30°", "B. 120°", "C. 60°", "D. 50°"],
        answer: 2,
        explanation: "Vì AD là tia phân giác của góc BAC nên A1 = 120° / 2 = 60°."
      },
      // Tự luận
      {
        id: "toan7_de01_tl_01",
        type: "short_essay",
        topic: "Thực hiện phép tính",
        question: "Câu 1. (2,0 điểm) Thực hiện phép tính:\na) 5/6 + 7/15 - 1/5\nb) (-1/2)^2 - 5/4 : (-3/2 + 7/6)",
        modelAnswer: "a) 5/6 + 7/15 - 1/5 = 25/30 + 14/30 - 6/30 = 33/30 = 11/10.\nb) (-1/2)^2 - 5/4 : (-3/2 + 7/6) = 1/4 - 5/4 : (-9/6 + 7/6) = 1/4 - 5/4 : (-1/3) = 1/4 - 5/4 * (-3) = 1/4 + 15/4 = 16/4 = 4.",
        explanation: "Thực hiện đúng thứ tự trong ngoặc trước, nhân chia trước cộng trừ sau."
      },
      {
        id: "toan7_de01_tl_02",
        type: "short_essay",
        topic: "Tìm x",
        question: "Câu 2. (1,5 điểm) Tìm x, biết:\na) x - 7/4 = 5/12\nb) |x| - 5/4 = -1/2",
        modelAnswer: "a) x = 5/12 + 7/4 = 5/12 + 21/12 = 26/12 = 13/6.\nb) |x| = -1/2 + 5/4 = -2/4 + 5/4 = 3/4 => x = 3/4 hoặc x = -3/4.",
        explanation: "Chú ý trường hợp phương trình chứa dấu giá trị tuyệt đối có 2 nghiệm."
      },
      {
        id: "toan7_de01_tl_03",
        type: "short_essay",
        topic: "Hình học - Đường thẳng song song",
        image: "/images/math7/toan7_de01_tl_c03.png",
        question: "Câu 3. (2,0 điểm) Cho hình vẽ bên, biết F1 = H1 = 80°.\na) Chứng minh a // b.\nb) Cho K1 = 70°. Tính số đo các góc K2, K3, I1, I2.",
        modelAnswer: "a) Ta có F1 = H1 = 80°, mà hai góc này ở vị trí đồng vị nên a // b.\nb) \n- Góc K2 kề bù với K1 nên K2 = 180° - 70° = 110°.\n- Góc K3 đối đỉnh với K1 nên K3 = K1 = 70°.\n- Vì a // b nên:\n  + Góc I2 = K1 = 70° (so le trong).\n  + Góc I1 = K2 = 110° (so le trong) hoặc I1 kề bù I2 nên I1 = 180° - 70° = 110°.",
        explanation: "Vận dụng tính chất hai đường thẳng song song và các cặp góc so le trong, đồng vị, đối đỉnh."
      },
      {
        id: "toan7_de01_tl_04",
        type: "short_essay",
        topic: "Toán thực tế - Tỉ số phần trăm",
        question: "Câu 4. (1,0 điểm) Một cửa hàng thời trang có chương trình giảm giá 10% cho mặt hàng váy và 15% cho mặt hàng áo. Bạn Tuyết mua ở cửa hàng này một cái váy có giá niêm yết 230 000 đồng và một cái áo có giá niêm yết 160 000 đồng.\na) Bạn Tuyết phải trả bao nhiêu tiền cho cái váy?\nb) Biết cửa hàng nhập cái váy với giá 190 000 đồng và cái áo với giá 140 000 đồng. Hỏi khi bán cái váy và cái áo cho bạn Tuyết, cửa hàng lời hay lỗ bao nhiêu tiền?",
        modelAnswer: "a) Số tiền Tuyết phải trả cho cái váy là: 230 000 * (100% - 10%) = 207 000 đồng.\nb) \n- Số tiền Tuyết trả cho cái áo là: 160 000 * (100% - 15%) = 136 000 đồng.\n- Tổng số tiền Tuyết trả là: 207 000 + 136 000 = 343 000 đồng.\n- Tổng giá vốn nhập hai món hàng: 190 000 + 140 000 = 330 000 đồng.\n- Do 343 000 > 330 000 nên cửa hàng lời: 343 000 - 330 000 = 13 000 đồng.",
        explanation: "Tính giá bán sau khuyến mãi của từng sản phẩm rồi so sánh với tổng giá vốn."
      },
      {
        id: "toan7_de01_tl_05",
        type: "short_essay",
        topic: "Hình học - Chứng minh song song nâng cao",
        image: "/images/math7/toan7_de01_tl_c05.png",
        question: "Câu 5. (0,5 điểm) Cho hình vẽ bên, biết A1 = B1, tia [..] là tia phân giác của ABD và tia CB là tia phân giác của ACD. Chứng minh AB // CD.",
        modelAnswer: "Từ giả thiết A1 = B1 và vị trí so le trong/đồng vị suy ra các đường thẳng liên quan song song; kết hợp tính chất tia phân giác để chứng minh hai góc so le trong tạo bởi AB và CD với cát tuyến bằng nhau, từ đó suy ra AB // CD.",
        explanation: "Sử dụng tính chất cặp góc tạo bởi cát tuyến và tia phân giác."
      }
    ]
  },

  // ==========================================
  // ĐỀ SỐ 02
  // ==========================================
  {
    test_id: "toan7_de02",
    title: "Toán 7 - Đề Số 02 (Giữa Kỳ 1)",
    subject: "toan",
    term: "HK1_GiuaKy",
    time_limit_minutes: 60,
    is_active: true,
    questions: [
      {
        id: "toan7_de02_tn_01",
        type: "multiple_choice",
        topic: "Số nguyên",
        question: "Câu 1. Tập hợp các số nguyên được kí hiệu là",
        options: ["A. N", "B. Z", "C. Q", "D. R"],
        answer: 1,
        explanation: "Tập hợp các số nguyên được kí hiệu là Z."
      },
      {
        id: "toan7_de02_tn_02",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 2. Khẳng định nào sau đây đúng?",
        options: ["A. 3/5 ∈ Z", "B. -2 ∈ N", "C. 7 ∉ Q", "D. -0,5 ∈ Q"],
        answer: 3,
        explanation: "-0,5 = -1/2 là số hữu tỉ nên -0,5 ∈ Q."
      },
      {
        id: "toan7_de02_tn_03",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 3. Phân số nào sau đây biểu diễn số hữu tỉ -0,4?",
        options: ["A. -2/5", "B. 4/10", "C. -4/5", "D. 2/(-10)"],
        answer: 0,
        explanation: "-0,4 = -4/10 = -2/5."
      },
      {
        id: "toan7_de02_tn_04",
        type: "multiple_choice",
        topic: "Số đối",
        question: "Câu 4. Số đối của số hữu tỉ -3/4 là",
        options: ["A. -3/4", "B. 4/3", "C. 3/4", "D. -4/3"],
        answer: 2,
        explanation: "Số đối của -3/4 là 3/4."
      },
      {
        id: "toan7_de02_tn_05",
        type: "multiple_choice",
        topic: "Căn bậc hai & Làm tròn",
        question: "Câu 5. Dùng máy tính cầm tay tính √10 rồi làm tròn kết quả đến hàng phần mười, ta được",
        options: ["A. 3,2", "B. 3,1", "C. 3,16", "D. 3,17"],
        answer: 0,
        explanation: "√10 ≈ 3,162277... Chữ số hàng phần trăm là 6 (≥ 5) nên làm tròn đến hàng phần mười là 3,2."
      },
      {
        id: "toan7_de02_tn_06",
        type: "multiple_choice",
        topic: "Giá trị tuyệt đối",
        question: "Câu 6. Kết quả của phép tính |-3/4| - 1/2 là",
        options: ["A. -5/4", "B. 5/4", "C. 1/4", "D. -1/4"],
        answer: 2,
        explanation: "| -3/4 | = 3/4. Ta có 3/4 - 1/2 = 3/4 - 2/4 = 1/4."
      },
      {
        id: "toan7_de02_tn_07",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 7. Kết quả của phép tính 1 3/7 + (-2/5) + 4/7 + (-13/5) là",
        options: ["A. 2", "B. -2", "C. 0", "D. -1"],
        answer: 3,
        explanation: "(10/7 + 4/7) + [(-2/5) + (-13/5)] = 14/7 + (-15/5) = 2 + (-3) = -1."
      },
      {
        id: "toan7_de02_tn_08",
        type: "multiple_choice",
        topic: "Lũy thừa",
        question: "Câu 8. Kết quả của phép tính 2^5 . 2^3 là",
        options: ["A. 2^15", "B. 4^8", "C. 2^2", "D. 2^8"],
        answer: 3,
        explanation: "2^5 . 2^3 = 2^(5+3) = 2^8."
      },
      {
        id: "toan7_de02_tn_09",
        type: "multiple_choice",
        topic: "Tiên đề Euclid",
        question: "Câu 9. Qua một điểm ở ngoài một đường thẳng, có bao nhiêu đường thẳng song song với đường thẳng đó?",
        options: ["A. Hai", "B. Duy nhất một", "C. Vô số", "D. Không có"],
        answer: 1,
        explanation: "Qua một điểm ở ngoài một đường thẳng chỉ có duy nhất một đường thẳng song song với đường thẳng đó."
      },
      {
        id: "toan7_de02_tn_10",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de02_tn_c10.png",
        question: "Câu 10. Cho hình vẽ bên. Cặp góc A1 và B1 là cặp góc",
        options: ["A. so le trong.", "B. đối đỉnh.", "C. đồng vị.", "D. kề bù."],
        answer: 2,
        explanation: "A1 và B1 nằm ở vị trí đồng vị."
      },
      {
        id: "toan7_de02_tn_11",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de02_tn_c11.png",
        question: "Câu 11. Cho hình vẽ bên, biết a // b và A1 = 65°. Số đo của B1 là",
        options: ["A. 65°", "B. 115°", "C. 25°", "D. 130°"],
        answer: 0,
        explanation: "Do a // b nên hai góc so le trong A1 và B1 bằng nhau: B1 = A1 = 65°."
      },
      {
        id: "toan7_de02_tn_12",
        type: "multiple_choice",
        topic: "Tia phân giác",
        image: "/images/math7/toan7_de02_tn_c12.png",
        question: "Câu 12. Cho hình vẽ bên, biết xOy = 110° và Ot là tia phân giác của xOy. Số đo của xOt là",
        options: ["A. 110°", "B. 70°", "C. 45°", "D. 55°"],
        answer: 3,
        explanation: "Ot là phân giác của xOy => xOt = 110° / 2 = 55°."
      },
      // Tự luận
      {
        id: "toan7_de02_tl_01",
        type: "short_essay",
        topic: "Thực hiện phép tính",
        question: "Câu 1. (2,0 điểm) Thực hiện phép tính:\na) 1/2 + 2/3 - 3/4\nb) (3/4)^2 - 5/9 : (-2/3 + 1/6)",
        modelAnswer: "a) 1/2 + 2/3 - 3/4 = 6/12 + 8/12 - 9/12 = 5/12.\nb) 9/16 - 5/9 : (-4/6 + 1/6) = 9/16 - 5/9 : (-3/6) = 9/16 - 5/9 : (-1/2) = 9/16 - 5/9 * (-2) = 9/16 + 10/9 = 81/144 + 160/144 = 241/144.",
        explanation: "Tính trong ngoặc trước, lũy thừa rồi đến phép chia và cộng."
      },
      {
        id: "toan7_de02_tl_02",
        type: "short_essay",
        topic: "Tìm x",
        question: "Câu 2. (1,5 điểm) Tìm x, biết:\na) x + 3/4 = 1/2\nb) |x| + 1/3 = 5/6",
        modelAnswer: "a) x = 1/2 - 3/4 = 2/4 - 3/4 = -1/4.\nb) |x| = 5/6 - 1/3 = 5/6 - 2/6 = 3/6 = 1/2 => x = 1/2 hoặc x = -1/2.",
        explanation: "Chuyển vế đổi dấu và giải hai trường hợp giá trị tuyệt đối."
      },
      {
        id: "toan7_de02_tl_03",
        type: "short_essay",
        topic: "Hình học phẳng",
        image: "/images/math7/toan7_de02_tl_c03.png",
        question: "Câu 3. (2,0 điểm) Cho hình vẽ bên, biết M1 = N1 = 110°.\na) Chứng minh a // b.\nb) Cho Q1 = 60°. Tính số đo các góc Q2, Q3, P1, P2.",
        modelAnswer: "a) Vì M1 = N1 = 110° mà hai góc này ở vị trí đồng vị (hoặc so le trong theo hình vẽ) nên a // b.\nb) \n- Q2 kề bù Q1 => Q2 = 180° - 60° = 120°.\n- Q3 đối đỉnh Q1 => Q3 = 60°.\n- Do a // b => P2 = Q1 = 60° (so le trong), P1 = Q2 = 120° (đồng vị hoặc kề bù P2).",
        explanation: "Sử dụng tính chất cặp góc song song."
      },
      {
        id: "toan7_de02_tl_04",
        type: "short_essay",
        topic: "Toán thực tế",
        question: "Câu 4. (1,0 điểm) Một cửa hàng quần áo giảm giá 20% cho áo khoác và 10% cho quần jean. Bạn An mua một chiếc áo khoác có giá niêm yết 350 000 đồng và một chiếc quần jean có giá niêm yết 250 000 đồng.\na) Bạn An phải trả bao nhiêu tiền cho chiếc áo khoác?\nb) Biết cửa hàng nhập chiếc áo khoác với giá 300 000 đồng và chiếc quần jean với giá 200 000 đồng. Hỏi khi bán hai sản phẩm này cho bạn An, cửa hàng lời hay lỗ bao nhiêu tiền?",
        modelAnswer: "a) Số tiền trả cho áo khoác: 350 000 * 80% = 280 000 đồng.\nb) \n- Số tiền trả cho quần jean: 250 000 * 90% = 225 000 đồng.\n- Tổng số tiền An trả: 280 000 + 225 000 = 505 000 đồng.\n- Tổng giá vốn nhập: 300 000 + 200 000 = 500 000 đồng.\n- Vì 505 000 > 500 000 nên cửa hàng lời: 505 000 - 500 000 = 5 000 đồng.",
        explanation: "Tính tiền từng sản phẩm sau giảm giá, so sánh tổng thu và tổng vốn."
      },
      {
        id: "toan7_de02_tl_05",
        type: "short_essay",
        topic: "Hình học - Chứng minh song song",
        image: "/images/math7/toan7_de02_tl_c05.png",
        question: "Câu 5. (0,5 điểm) Cho hình vẽ bên, biết a // b, đường thẳng c cắt a, b lần lượt tại A và B. Am là tia phân giác của xAB, Bn là tia phân giác của ABy. Chứng minh Am // Bn.",
        modelAnswer: "Vì a // b nên xAB = ABy (hai góc so le trong). Vì Am là phân giác của xAB nên mAB = 1/2 xAB. Vì Bn là phân giác của ABy nên nBA = 1/2 ABy. Suy ra mAB = nBA. Mà hai góc này ở vị trí so le trong nên Am // Bn.",
        explanation: "Hai góc so le trong bằng nhau dẫn đến hai tia phân giác của chúng song song."
      }
    ]
  },

  // ==========================================
  // ĐỀ SỐ 03
  // ==========================================
  {
    test_id: "toan7_de03",
    title: "Toán 7 - Đề Số 03 (Giữa Kỳ 1)",
    subject: "toan",
    term: "HK1_GiuaKy",
    time_limit_minutes: 60,
    is_active: true,
    questions: [
      {
        id: "toan7_de03_tn_01",
        type: "multiple_choice",
        topic: "Số thực",
        question: "Câu 1. Tập hợp các số thực được kí hiệu là",
        options: ["A. N", "B. Z", "C. Q", "D. R"],
        answer: 3,
        explanation: "Tập hợp các số thực được kí hiệu là R."
      },
      {
        id: "toan7_de03_tn_02",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 2. Khẳng định nào sau đây đúng?",
        options: ["A. -5 ∈ N", "B. 0,3 ∉ Q", "C. -2/3 ∈ Q", "D. 1/2 ∈ Z"],
        answer: 2,
        explanation: "-2/3 là phân số nên -2/3 ∈ Q."
      },
      {
        id: "toan7_de03_tn_03",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 3. Phân số nào sau đây biểu diễn số hữu tỉ 3/4?",
        options: ["A. 6/8", "B. -6/8", "C. 4/3", "D. 9/16"],
        answer: 0,
        explanation: "6/8 rút gọn được 3/4."
      },
      {
        id: "toan7_de03_tn_04",
        type: "multiple_choice",
        topic: "So sánh số hữu tỉ",
        question: "Câu 4. Các số -1/2; 0,3; -2; 1 được sắp xếp theo thứ tự tăng dần là",
        options: ["A. -1/2; -2; 0,3; 1", "B. -2; -1/2; 0,3; 1", "C. 1; 0,3; -1/2; -2", "D. -2; 0,3; -1/2; 1"],
        answer: 1,
        explanation: "Ta có -2 < -0,5 < 0,3 < 1 nên thứ tự tăng dần là: -2; -1/2; 0,3; 1."
      },
      {
        id: "toan7_de03_tn_05",
        type: "multiple_choice",
        topic: "Căn bậc hai & Làm tròn",
        question: "Câu 5. Dùng máy tính cầm tay tính √20 rồi làm tròn kết quả đến hàng phần trăm, ta được",
        options: ["A. 4,4", "B. 4,472", "C. 4,47", "D. 4,48"],
        answer: 2,
        explanation: "√20 ≈ 4,472135... Làm tròn đến chữ số thập phân thứ hai được 4,47."
      },
      {
        id: "toan7_de03_tn_06",
        type: "multiple_choice",
        topic: "Giá trị tuyệt đối",
        question: "Câu 6. Kết quả của phép tính |1/3 - 1| + 1/3 là",
        options: ["A. 1", "B. -1/3", "C. 1/3", "D. -1"],
        answer: 0,
        explanation: "| 1/3 - 1 | = | -2/3 | = 2/3. Ta có 2/3 + 1/3 = 3/3 = 1."
      },
      {
        id: "toan7_de03_tn_07",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 7. Kết quả của phép tính 4/9 + (-5/11) + 5/9 + 7/11 là",
        options: ["A. 9/11", "B. 1", "C. -13/11", "D. 13/11"],
        answer: 3,
        explanation: "(4/9 + 5/9) + [(-5/11) + 7/11] = 1 + 2/11 = 13/11."
      },
      {
        id: "toan7_de03_tn_08",
        type: "multiple_choice",
        topic: "Lũy thừa",
        question: "Câu 8. Kết quả của phép tính 3^10 : 3^2 là",
        options: ["A. 3^5", "B. 3^8", "C. 3^12", "D. 1^8"],
        answer: 1,
        explanation: "3^10 : 3^2 = 3^(10-2) = 3^8."
      },
      {
        id: "toan7_de03_tn_09",
        type: "multiple_choice",
        topic: "Tiên đề Euclid",
        question: "Câu 9. Cho điểm A nằm ngoài đường thẳng d. Số đường thẳng đi qua A và song song với d là",
        options: ["A. 1", "B. 0", "C. 2", "D. vô số"],
        answer: 0,
        explanation: "Theo tiên đề Euclid, có duy nhất 1 đường thẳng đi qua A và song song với d."
      },
      {
        id: "toan7_de03_tn_10",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de03_tn_c10.png",
        question: "Câu 10. Cho hình vẽ bên. Cặp góc A2 và B1 là cặp góc",
        options: ["A. đồng vị.", "B. đối đỉnh.", "C. kề bù.", "D. so le trong."],
        answer: 3,
        explanation: "A2 và B1 là hai góc ở vị trí so le trong."
      },
      {
        id: "toan7_de03_tn_11",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de03_tn_c11.png",
        question: "Câu 11. Cho hình vẽ bên, biết a // b và A1 = 120°. Số đo của B1 là",
        options: ["A. 60°", "B. 120°", "C. 30°", "D. 150°"],
        answer: 1,
        explanation: "Do a // b, hai góc đồng vị A1 và B1 bằng nhau: B1 = A1 = 120°."
      },
      {
        id: "toan7_de03_tn_12",
        type: "multiple_choice",
        topic: "Góc kề bù",
        image: "/images/math7/toan7_de03_tn_c12.png",
        question: "Câu 12. Cho hình vẽ bên, biết xOy = 50°. Số đo của yOx' là",
        options: ["A. 50°", "B. 40°", "C. 130°", "D. 150°"],
        answer: 2,
        explanation: "xOy và yOx' kề bù nên yOx' = 180° - 50° = 130°."
      },
      // Tự luận
      {
        id: "toan7_de03_tl_01",
        type: "short_essay",
        topic: "Thực hiện phép tính",
        question: "Câu 1. (2,0 điểm) Thực hiện phép tính:\na) 3/5 - 1/2 + 7/10\nb) (1/3)^2 . 9 - 3/4 : (1/2 + 1/4)",
        modelAnswer: "a) 6/10 - 5/10 + 7/10 = 8/10 = 4/5.\nb) (1/9) * 9 - 3/4 : (3/4) = 1 - 1 = 0.",
        explanation: "Thực hiện đúng quy tắc lũy thừa, cộng trừ quy đồng."
      },
      {
        id: "toan7_de03_tl_02",
        type: "short_essay",
        topic: "Tìm x",
        question: "Câu 2. (1,5 điểm) Tìm x, biết:\na) x - 2/3 = 1/6\nb) |x| - 1/4 = 3/4",
        modelAnswer: "a) x = 1/6 + 2/3 = 1/6 + 4/6 = 5/6.\nb) |x| = 3/4 + 1/4 = 1 => x = 1 hoặc x = -1.",
        explanation: "Chuyển vế và giải phương trình giá trị tuyệt đối."
      },
      {
        id: "toan7_de03_tl_03",
        type: "short_essay",
        topic: "Hình học phẳng",
        image: "/images/math7/toan7_de03_tl_c03.png",
        question: "Câu 3. (2,0 điểm) Cho hình vẽ bên, biết A1 = B1 = 100°.\na) Chứng minh a // b.\nb) Cho D1 = 65°. Tính số đo các góc D2, D3, C1, C2.",
        modelAnswer: "a) Vì A1 = B1 = 100° ở vị trí đồng vị nên a // b.\nb)\n- D2 đối đỉnh D1 => D2 = 65°.\n- D3 kề bù D1 => D3 = 180° - 65° = 115°.\n- Do a // b: C1 = D1 = 65° (đồng vị), C2 = D3 = 115° (so le trong hoặc kề bù C1).",
        explanation: "Vận dụng tính chất góc tạo bởi hai đường thẳng song song."
      },
      {
        id: "toan7_de03_tl_04",
        type: "short_essay",
        topic: "Toán thực tế",
        question: "Câu 4. (1,0 điểm) Một nhà sách giảm giá 10% cho sách tham khảo và 25% cho ba lô. Bạn Minh mua một quyển sách tham khảo có giá niêm yết 120 000 đồng và một chiếc ba lô có giá niêm yết 240 000 đồng.\na) Bạn Minh phải trả bao nhiêu tiền cho chiếc ba lô?\nb) Biết nhà sách nhập quyển sách với giá 100 000 đồng và chiếc ba lô với giá 200 000 đồng. Hỏi khi bán hai sản phẩm này cho bạn Minh, nhà sách lời hay lỗ bao nhiêu tiền?",
        modelAnswer: "a) Số tiền mua ba lô: 240 000 * (100% - 25%) = 180 000 đồng.\nb) \n- Tiền mua sách: 120 000 * 90% = 108 000 đồng.\n- Tổng tiền Minh trả: 180 000 + 108 000 = 288 000 đồng.\n- Tổng vốn nhập: 100 000 + 200 000 = 300 000 đồng.\n- Vì 288 000 < 300 000 nên nhà sách lỗ: 300 000 - 288 000 = 12 000 đồng.",
        explanation: "Chú ý trường hợp tổng thu nhỏ hơn tổng giá vốn dẫn đến bị lỗ."
      },
      {
        id: "toan7_de03_tl_05",
        type: "short_essay",
        topic: "Hình học - Chứng minh song song",
        image: "/images/math7/toan7_de03_tl_c05.png",
        question: "Câu 5. (0,5 điểm) Cho hình vẽ bên, biết a // b, đường thẳng c cắt a, b lần lượt tại A và B (tia Az nằm trên c). Am là tia phân giác của xAz, Bn là tia phân giác của yBA. Chứng minh Am // Bn.",
        modelAnswer: "Do a // b nên xAz = yBA (hai góc đồng vị). Do Am là phân giác góc xAz và Bn là phân giác góc yBA nên mAz = 1/2 xAz = 1/2 yBA = nBA. Hai góc này ở vị trí đồng vị nên Am // Bn.",
        explanation: "Hai góc đồng vị bằng nhau có các tia phân giác tương ứng song song."
      }
    ]
  },

  // ==========================================
  // ĐỀ SỐ 04
  // ==========================================
  {
    test_id: "toan7_de04",
    title: "Toán 7 - Đề Số 04 (Giữa Kỳ 1)",
    subject: "toan",
    term: "HK1_GiuaKy",
    time_limit_minutes: 60,
    is_active: true,
    questions: [
      {
        id: "toan7_de04_tn_01",
        type: "multiple_choice",
        topic: "Tập hợp số hữu tỉ",
        question: "Câu 1. Kí hiệu Q dùng để chỉ tập hợp",
        options: ["A. các số tự nhiên.", "B. các số nguyên.", "C. các số hữu tỉ.", "D. các số thực."],
        answer: 2,
        explanation: "Q là tập hợp các số hữu tỉ."
      },
      {
        id: "toan7_de04_tn_02",
        type: "multiple_choice",
        topic: "Tập hợp số",
        question: "Câu 2. Khẳng định nào sau đây đúng?",
        options: ["A. -4 ∈ Z", "B. 2/7 ∈ Z", "C. -9 ∈ N", "D. 1,5 ∉ Q"],
        answer: 0,
        explanation: "-4 là số nguyên âm nên -4 ∈ Z."
      },
      {
        id: "toan7_de04_tn_03",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 3. Phân số nào sau đây biểu diễn số hữu tỉ -2/3?",
        options: ["A. 4/6", "B. 6/(-9)", "C. -4/(-6)", "D. 2/3"],
        answer: 1,
        explanation: "6/(-9) = -2/3."
      },
      {
        id: "toan7_de04_tn_04",
        type: "multiple_choice",
        topic: "So sánh số hữu tỉ",
        question: "Câu 4. Số nhỏ nhất trong các số -1/2; 0; -0,75; 1/3 là",
        options: ["A. -1/2", "B. 0", "C. 1/3", "D. -0,75"],
        answer: 3,
        explanation: "-1/2 = -0,5. Ta có -0,75 < -0,5 < 0 < 1/3 nên -0,75 là số nhỏ nhất."
      },
      {
        id: "toan7_de04_tn_05",
        type: "multiple_choice",
        topic: "Căn bậc hai & Làm tròn",
        question: "Câu 5. Dùng máy tính cầm tay tính √7 rồi làm tròn kết quả đến hàng phần mười, ta được",
        options: ["A. 2,7", "B. 2,6", "C. 2,65", "D. 2,64"],
        answer: 1,
        explanation: "√7 ≈ 2,6457... Chữ số hàng phần trăm là 4 (< 5) nên làm tròn thành 2,6."
      },
      {
        id: "toan7_de04_tn_06",
        type: "multiple_choice",
        topic: "Giá trị tuyệt đối",
        question: "Câu 6. Kết quả của phép tính |2/5 - 1| - 1/5 là",
        options: ["A. -4/5", "B. 4/5", "C. -2/5", "D. 2/5"],
        answer: 3,
        explanation: "| 2/5 - 1 | = | -3/5 | = 3/5. Ta có 3/5 - 1/5 = 2/5."
      },
      {
        id: "toan7_de04_tn_07",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 7. Kết quả của phép tính 1/10 + (-4/3) + 9/10 + 1/3 là",
        options: ["A. 0", "B. -1", "C. 1", "D. -2/3"],
        answer: 0,
        explanation: "(1/10 + 9/10) + [(-4/3) + 1/3] = 1 + (-3/3) = 1 - 1 = 0."
      },
      {
        id: "toan7_de04_tn_08",
        type: "multiple_choice",
        topic: "Lũy thừa",
        question: "Câu 8. Kết quả của phép tính (5^2)^3 là",
        options: ["A. 5^5", "B. 5^8", "C. 5^6", "D. 5^9"],
        answer: 2,
        explanation: "(5^2)^3 = 5^(2*3) = 5^6."
      },
      {
        id: "toan7_de04_tn_09",
        type: "multiple_choice",
        topic: "Tiên đề Euclid",
        question: "Câu 9. Phát biểu nào sau đây là nội dung của tiên đề Euclid?",
        options: [
          "A. Qua một điểm ở ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó.",
          "B. Qua một điểm ở ngoài một đường thẳng có vô số đường thẳng song song với đường thẳng đó.",
          "C. Qua một điểm ở ngoài một đường thẳng không có đường thẳng nào song song với đường thẳng đó.",
          "D. Qua một điểm ở ngoài một đường thẳng có đúng hai đường thẳng song song với đường thẳng đó."
        ],
        answer: 0,
        explanation: "Phát biểu A chính là nội dung tiên đề Euclid."
      },
      {
        id: "toan7_de04_tn_10",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de04_tn_c10.png",
        question: "Câu 10. Cho hình vẽ bên. Cặp góc A1 và A3 là cặp góc",
        options: ["A. so le trong.", "B. đồng vị.", "C. kề bù.", "D. đối đỉnh."],
        answer: 3,
        explanation: "Hai góc A1 và A3 đối đỉnh nhau."
      },
      {
        id: "toan7_de04_tn_11",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de04_tn_c11.png",
        question: "Câu 11. Cho hình vẽ bên, biết a // b và A2 = 75°. Số đo của B1 là",
        options: ["A. 105°", "B. 75°", "C. 15°", "D. 150°"],
        answer: 1,
        explanation: "A2 và B1 là cặp góc so le trong nên B1 = A2 = 75°."
      },
      {
        id: "toan7_de04_tn_12",
        type: "multiple_choice",
        topic: "Góc kề bù",
        image: "/images/math7/toan7_de04_tn_c12.png",
        question: "Câu 12. Hai đường thẳng xx' và yy' cắt nhau tại O (hình vẽ bên), biết xOy = 40°. Số đo của x'Oy là",
        options: ["A. 40°", "B. 50°", "C. 140°", "D. 80°"],
        answer: 2,
        explanation: "x'Oy và xOy là hai góc kề bù nên x'Oy = 180° - 40° = 140°."
      },
      // Tự luận
      {
        id: "toan7_de04_tl_01",
        type: "short_essay",
        topic: "Thực hiện phép tính",
        question: "Câu 1. (2,0 điểm) Thực hiện phép tính:\na) 1/4 + 5/6 - 1/3\nb) (-1/2)^3 + 3/8 : (1 - 1/4)",
        modelAnswer: "a) 3/12 + 10/12 - 4/12 = 9/12 = 3/4.\nb) -1/8 + 3/8 : (3/4) = -1/8 + 3/8 * 4/3 = -1/8 + 1/2 = -1/8 + 4/8 = 3/8.",
        explanation: "Lũy thừa số âm bậc 3 cho kết quả âm, chia phân số nhân nghịch đảo."
      },
      {
        id: "toan7_de04_tl_02",
        type: "short_essay",
        topic: "Tìm x",
        question: "Câu 2. (1,5 điểm) Tìm x, biết:\na) x + 1/5 = 7/10\nb) |x| + 2/5 = 1",
        modelAnswer: "a) x = 7/10 - 1/5 = 7/10 - 2/10 = 5/10 = 1/2.\nb) |x| = 1 - 2/5 = 3/5 => x = 3/5 hoặc x = -3/5.",
        explanation: "Giải phương trình tìm x thông thường và phương trình trị tuyệt đối."
      },
      {
        id: "toan7_de04_tl_03",
        type: "short_essay",
        topic: "Hình học phẳng",
        image: "/images/math7/toan7_de04_tl_c03.png",
        question: "Câu 3. (2,0 điểm) Cho hình vẽ bên, biết E1 = F1 = 110°.\na) Chứng minh a // b.\nb) Cho H1 = 125°. Tính số đo các góc H2, H3, G1, G2.",
        modelAnswer: "a) E1 và F1 ở vị trí đồng vị và E1 = F1 = 110° => a // b.\nb)\n- H2 kề bù H1 => H2 = 180° - 125° = 55°.\n- H3 đối đỉnh H1 => H3 = 125°.\n- Do a // b: G1 = H2 = 55° (đồng vị), G2 = H1 = 125° (so le trong hoặc đồng vị).",
        explanation: "Áp dụng định lí hai đường thẳng song song."
      },
      {
        id: "toan7_de04_tl_04",
        type: "short_essay",
        topic: "Toán thực tế",
        question: "Câu 4. (1,0 điểm) Một cửa hàng điện máy giảm giá 15% cho quạt điện và 20% cho nồi cơm điện. Chị Lan mua một chiếc quạt có giá niêm yết 600 000 đồng và một chiếc nồi cơm điện có giá niêm yết 800 000 đồng.\na) Chị Lan phải trả bao nhiêu tiền cho chiếc quạt?\nb) Biết cửa hàng nhập chiếc quạt với giá 450 000 đồng và chiếc nồi cơm điện với giá 680 000 đồng. Hỏi khi bán hai sản phẩm này cho chị Lan, cửa hàng lời hay lỗ bao nhiêu tiền?",
        modelAnswer: "a) Tiền mua quạt điện: 600 000 * (100% - 15%) = 510 000 đồng.\nb)\n- Tiền mua nồi cơm: 800 000 * 80% = 640 000 đồng.\n- Tổng tiền chị Lan trả: 510 000 + 640 000 = 1 150 000 đồng.\n- Tổng giá vốn: 450 000 + 680 000 = 1 130 000 đồng.\n- Lời: 1 150 000 - 1 130 000 = 20 000 đồng.",
        explanation: "So sánh tổng số tiền thu về và tổng giá vốn nhập hàng."
      },
      {
        id: "toan7_de04_tl_05",
        type: "short_essay",
        topic: "Hình học - Tia phân giác và song song",
        image: "/images/math7/toan7_de04_tl_c05.png",
        question: "Câu 5. (0,5 điểm) Cho hình vẽ bên, biết xOy = 80° và Ot là tia phân giác của xOy. Điểm M thuộc tia Oy, tia Mz sao cho yMz = 40°. Chứng minh Mz // Ot.",
        modelAnswer: "Vì Ot là tia phân giác của góc xOy nên yOt = 1/2 xOy = 1/2 * 80° = 40°. Ta thấy yMz = 40° nên yMz = yOt (= 40°). Mà hai góc này ở vị trí đồng vị nên Mz // Ot.",
        explanation: "Chứng minh hai góc đồng vị bằng nhau để kết luận song song."
      }
    ]
  },

  // ==========================================
  // ĐỀ SỐ 05
  // ==========================================
  {
    test_id: "toan7_de05",
    title: "Toán 7 - Đề Số 05 (Giữa Kỳ 1)",
    subject: "toan",
    term: "HK1_GiuaKy",
    time_limit_minutes: 60,
    is_active: true,
    questions: [
      {
        id: "toan7_de05_tn_01",
        type: "multiple_choice",
        topic: "Tập hợp số",
        question: "Câu 1. Tập hợp các số tự nhiên được kí hiệu là",
        options: ["A. N", "B. Z", "C. Q", "D. R"],
        answer: 0,
        explanation: "N là tập hợp số tự nhiên."
      },
      {
        id: "toan7_de05_tn_02",
        type: "multiple_choice",
        topic: "Tập hợp số",
        question: "Câu 2. Khẳng định nào sau đây đúng?",
        options: ["A. 0 ∉ Z", "B. -3/4 ∈ Q", "C. 6 ∉ Q", "D. -1 ∈ N"],
        answer: 1,
        explanation: "-3/4 là số hữu tỉ nên -3/4 ∈ Q."
      },
      {
        id: "toan7_de05_tn_03",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 3. Phân số nào sau đây biểu diễn số hữu tỉ 0,5?",
        options: ["A. 1/5", "B. 5/100", "C. 2/5", "D. 3/6"],
        answer: 3,
        explanation: "3/6 = 1/2 = 0,5."
      },
      {
        id: "toan7_de05_tn_04",
        type: "multiple_choice",
        topic: "Trục số",
        question: "Câu 4. Trên trục số, điểm biểu diễn số hữu tỉ -3/2 nằm giữa hai điểm biểu diễn hai số nguyên nào?",
        options: ["A. -1 và 0", "B. 1 và 2", "C. -2 và -1", "D. -3 và -2"],
        answer: 2,
        explanation: "-3/2 = -1,5. Số -1,5 nằm giữa -2 và -1."
      },
      {
        id: "toan7_de05_tn_05",
        type: "multiple_choice",
        topic: "Căn bậc hai & Làm tròn",
        question: "Câu 5. Dùng máy tính cầm tay tính √30 rồi làm tròn kết quả đến hàng phần trăm, ta được",
        options: ["A. 5,47", "B. 5,5", "C. 5,477", "D. 5,48"],
        answer: 3,
        explanation: "√30 ≈ 5,4772... Chữ số hàng phần nghìn là 7 (≥ 5) nên làm tròn đến hàng phần trăm là 5,48."
      },
      {
        id: "toan7_de05_tn_06",
        type: "multiple_choice",
        topic: "Phép tính phân số",
        question: "Câu 6. Kết quả của phép tính 2/3 - 1/6 là",
        options: ["A. -1/2", "B. 1/2", "C. 7/6", "D. -7/6"],
        answer: 1,
        explanation: "2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2."
      },
      {
        id: "toan7_de05_tn_07",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 7. Kết quả của phép tính 5/11 + (-2/7) + 6/11 + (-12/7) là",
        options: ["A. 1", "B. 0", "C. -1", "D. -2"],
        answer: 2,
        explanation: "(5/11 + 6/11) + [(-2/7) + (-12/7)] = 1 + (-14/7) = 1 + (-2) = -1."
      },
      {
        id: "toan7_de05_tn_08",
        type: "multiple_choice",
        topic: "Lũy thừa",
        question: "Câu 8. Kết quả của phép tính x^7 : x^3 (x ≠ 0) là",
        options: ["A. x^4", "B. x^10", "C. x^21", "D. x^3"],
        answer: 0,
        explanation: "x^7 : x^3 = x^(7-3) = x^4."
      },
      {
        id: "toan7_de05_tn_09",
        type: "multiple_choice",
        topic: "Tiên đề Euclid",
        question: "Câu 9. Qua điểm A nằm ngoài đường thẳng d, vẽ hai đường thẳng m và n cùng song song với d. Khi đó",
        options: ["A. m cắt n.", "B. m vuông góc với n.", "C. m trùng với n.", "D. m song song với n."],
        answer: 2,
        explanation: "Theo tiên đề Euclid, qua A chỉ có một đường thẳng song song với d nên m và n phải trùng nhau."
      },
      {
        id: "toan7_de05_tn_10",
        type: "multiple_choice",
        topic: "Góc kề bù",
        image: "/images/math7/toan7_de05_tn_c10.png",
        question: "Câu 10. Cho hình vẽ bên. Cặp góc A1 và A2 là cặp góc",
        options: ["A. đối đỉnh.", "B. kề bù.", "C. so le trong.", "D. đồng vị."],
        answer: 1,
        explanation: "A1 và A2 kề bù."
      },
      {
        id: "toan7_de05_tn_11",
        type: "multiple_choice",
        topic: "Góc trong cùng phía",
        image: "/images/math7/toan7_de05_tn_c11.png",
        question: "Câu 11. Cho hình vẽ bên, biết a // b và A1 = 110°. Số đo của B2 là",
        options: ["A. 110°", "B. 20°", "C. 90°", "D. 70°"],
        answer: 3,
        explanation: "A1 và B2 là cặp góc trong cùng phía bù nhau nên B2 = 180° - 110° = 70°."
      },
      {
        id: "toan7_de05_tn_12",
        type: "multiple_choice",
        topic: "Tia phân giác",
        image: "/images/math7/toan7_de05_tn_c12.png",
        question: "Câu 12. Cho hình vẽ bên, hai góc xOy và yOz kề bù, biết xOy = 120° và Ot là tia phân giác của yOz. Số đo của yOt là",
        options: ["A. 30°", "B. 60°", "C. 120°", "D. 15°"],
        answer: 0,
        explanation: "yOz = 180° - 120° = 60°. Do Ot là phân giác yOz nên yOt = 60° / 2 = 30°."
      },
      // Tự luận
      {
        id: "toan7_de05_tl_01",
        type: "short_essay",
        topic: "Thực hiện phép tính",
        question: "Câu 1. (2,0 điểm) Thực hiện phép tính:\na) 2/3 - 1/4 + 5/12\nb) (3/2)^2 - 1/2 : (1/4 - 1/2)",
        modelAnswer: "a) 8/12 - 3/12 + 5/12 = 10/12 = 5/6.\nb) 9/4 - 1/2 : (-1/4) = 9/4 - 1/2 * (-4) = 9/4 - (-2) = 9/4 + 8/4 = 17/4.",
        explanation: "Quy đồng phân số và chú ý đổi dấu khi trừ số âm."
      },
      {
        id: "toan7_de05_tl_02",
        type: "short_essay",
        topic: "Tìm x",
        question: "Câu 2. (1,5 điểm) Tìm x, biết:\na) x - 3/5 = -1/10\nb) |x| - 1/2 = 1/6",
        modelAnswer: "a) x = -1/10 + 3/5 = -1/10 + 6/10 = 5/10 = 1/2.\nb) |x| = 1/6 + 1/2 = 1/6 + 3/6 = 4/6 = 2/3 => x = 2/3 hoặc x = -2/3.",
        explanation: "Tìm x với phân số và giá trị tuyệt đối."
      },
      {
        id: "toan7_de05_tl_03",
        type: "short_essay",
        topic: "Hình học phẳng",
        image: "/images/math7/toan7_de05_tl_c03.png",
        question: "Câu 3. (2,0 điểm) Cho hình vẽ bên, biết C1 = D1 = 80°.\na) Chứng minh a // b.\nb) Cho F1 = 50°. Tính số đo các góc F2, F3, E1, E2.",
        modelAnswer: "a) C1 = D1 = 80° ở vị trí đồng vị nên a // b.\nb)\n- F2 kề bù F1 => F2 = 180° - 50° = 130°.\n- F3 đối đỉnh F1 => F3 = 50°.\n- Do a // b: E1 = F1 = 50° (đồng vị), E2 = F2 = 130° (so le trong hoặc kề bù E1).",
        explanation: "Áp dụng các định lí góc so le trong và đồng vị."
      },
      {
        id: "toan7_de05_tl_04",
        type: "short_essay",
        topic: "Toán thực tế",
        question: "Câu 4. (1,0 điểm) Một cửa hàng giày dép giảm giá 30% cho giày thể thao và 10% cho dép. Anh Nam mua một đôi giày có giá niêm yết 500 000 đồng và một đôi dép có giá niêm yết 200 000 đồng.\na) Anh Nam phải trả bao nhiêu tiền cho đôi giày?\nb) Biết cửa hàng nhập đôi giày với giá 380 000 đồng và đôi dép với giá 160 000 đồng. Hỏi khi bán hai sản phẩm này cho anh Nam, cửa hàng lời hay lỗ bao nhiêu tiền?",
        modelAnswer: "a) Tiền mua đôi giày: 500 000 * (100% - 30%) = 350 000 đồng.\nb)\n- Tiền mua dép: 200 000 * 90% = 180 000 đồng.\n- Tổng tiền Nam trả: 350 000 + 180 000 = 530 000 đồng.\n- Tổng giá vốn: 380 000 + 160 000 = 540 000 đồng.\n- Vì 530 000 < 540 000 nên cửa hàng lỗ: 540 000 - 530 000 = 10 000 đồng.",
        explanation: "Tính toán giá bán từng món và xác định kết quả kinh doanh lời/lỗ."
      },
      {
        id: "toan7_de05_tl_05",
        type: "short_essay",
        topic: "Hình học - Tia phân giác và song song",
        image: "/images/math7/toan7_de05_tl_c05.png",
        question: "Câu 5. (0,5 điểm) Cho hình vẽ bên, biết F1 = H1, tia HE là tia phân giác của FHG và tia EH là tia phân giác của FEG. Chứng minh FH // EG.",
        modelAnswer: "Từ F1 = H1 suy ra tính chất đối xứng/đồng dạng hoặc song song của các đường trung gian; kết hợp với các tia phân giác HE và EH chứng minh được hai góc so le trong bằng nhau, suy ra FH // EG.",
        explanation: "Áp dụng định lý về góc so le trong và tính chất tia phân giác."
      }
    ]
  },

  // ==========================================
  // ĐỀ SỐ 06
  // ==========================================
  {
    test_id: "toan7_de06",
    title: "Toán 7 - Đề Số 06 (Giữa Kỳ 1)",
    subject: "toan",
    term: "HK1_GiuaKy",
    time_limit_minutes: 60,
    is_active: true,
    questions: [
      {
        id: "toan7_de06_tn_01",
        type: "multiple_choice",
        topic: "Tập hợp số",
        question: "Câu 1. Kí hiệu R dùng để chỉ tập hợp",
        options: ["A. các số tự nhiên.", "B. các số nguyên.", "C. các số thực.", "D. các số hữu tỉ."],
        answer: 2,
        explanation: "R là tập hợp các số thực."
      },
      {
        id: "toan7_de06_tn_02",
        type: "multiple_choice",
        topic: "Tập hợp số",
        question: "Câu 2. Khẳng định nào sau đây đúng?",
        options: ["A. -7/8 ∉ Q", "B. -1/3 ∈ Z", "C. 2,5 ∈ N", "D. 12 ∈ Z"],
        answer: 3,
        explanation: "12 là số nguyên dương nên 12 ∈ Z."
      },
      {
        id: "toan7_de06_tn_03",
        type: "multiple_choice",
        topic: "Số hữu tỉ",
        question: "Câu 3. Phân số nào sau đây biểu diễn số hữu tỉ -1/4?",
        options: ["A. -2/(-8)", "B. 2/(-8)", "C. 1/4", "D. 4/(-1)"],
        answer: 1,
        explanation: "2/(-8) = -1/4."
      },
      {
        id: "toan7_de06_tn_04",
        type: "multiple_choice",
        topic: "So sánh phân số",
        question: "Câu 4. Khẳng định nào sau đây đúng?",
        options: ["A. -2/3 < -1/2", "B. -1/2 > -1/3", "C. 0,4 < 1/3", "D. 3/4 < 2/3"],
        answer: 0,
        explanation: "-2/3 = -4/6; -1/2 = -3/6. Vì -4 < -3 nên -2/3 < -1/2."
      },
      {
        id: "toan7_de06_tn_05",
        type: "multiple_choice",
        topic: "Căn bậc hai & Làm tròn",
        question: "Câu 5. Dùng máy tính cầm tay tính √50 rồi làm tròn kết quả đến hàng phần mười, ta được",
        options: ["A. 7,0", "B. 7,07", "C. 7,1", "D. 7,08"],
        answer: 2,
        explanation: "√50 ≈ 7,071... Chữ số hàng phần trăm là 7 (≥ 5) nên làm tròn thành 7,1."
      },
      {
        id: "toan7_de06_tn_06",
        type: "multiple_choice",
        topic: "Giá trị tuyệt đối",
        question: "Câu 6. Kết quả của phép tính |3/4 - 1| + 1/4 là",
        options: ["A. 0", "B. 1/2", "C. 2", "D. -1/2"],
        answer: 1,
        explanation: "| 3/4 - 1 | = | -1/4 | = 1/4. Ta có 1/4 + 1/4 = 2/4 = 1/2."
      },
      {
        id: "toan7_de06_tn_07",
        type: "multiple_choice",
        topic: "Phép tính số hữu tỉ",
        question: "Câu 7. Kết quả của phép tính (-4/15) + 3/10 + (-11/15) + 7/10 là",
        options: ["A. 0", "B. 1", "C. -1", "D. 2"],
        answer: 0,
        explanation: "[(-4/15) + (-11/15)] + (3/10 + 7/10) = -15/15 + 10/10 = -1 + 1 = 0."
      },
      {
        id: "toan7_de06_tn_08",
        type: "multiple_choice",
        topic: "Lũy thừa",
        question: "Câu 8. Kết quả của phép tính 7^4 . 7^5 là",
        options: ["A. 7^20", "B. 49^9", "C. 7^1", "D. 7^9"],
        answer: 3,
        explanation: "7^4 . 7^5 = 7^(4+5) = 7^9."
      },
      {
        id: "toan7_de06_tn_09",
        type: "multiple_choice",
        topic: "Tiên đề Euclid",
        question: "Câu 9. Cho đường thẳng a và điểm M không thuộc a. Đường thẳng đi qua M và song song với a",
        options: ["A. không tồn tại.", "B. có đúng hai đường.", "C. là duy nhất.", "D. có vô số đường."],
        answer: 2,
        explanation: "Theo tiên đề Euclid, đường thẳng đi qua M và song song với a là duy nhất."
      },
      {
        id: "toan7_de06_tn_10",
        type: "multiple_choice",
        topic: "Góc so le trong",
        image: "/images/math7/toan7_de06_tn_c10.png",
        question: "Câu 10. Cho hình vẽ bên. Cặp góc A1 và B1 là cặp góc",
        options: ["A. so le trong.", "B. đối đỉnh.", "C. kề bù.", "D. đồng vị."],
        answer: 0,
        explanation: "A1 và B1 nằm ở vị trí so le trong."
      },
      {
        id: "toan7_de06_tn_11",
        type: "multiple_choice",
        topic: "Hình học phẳng - Góc",
        image: "/images/math7/toan7_de06_tn_c11.png",
        question: "Câu 11. Cho hình vẽ bên, biết a // b và A1 = 40°. Số đo của B1 là",
        options: ["A. 140°", "B. 40°", "C. 50°", "D. 130°"],
        answer: 1,
        explanation: "A1 và B1 là cặp góc so le trong nên B1 = A1 = 40°."
      },
      {
        id: "toan7_de06_tn_12",
        type: "multiple_choice",
        topic: "Tia phân giác",
        image: "/images/math7/toan7_de06_tn_c12.png",
        question: "Câu 12. Cho hình vẽ bên, Ot là tia phân giác của xOy, biết xOt = 35°. Số đo của xOy là",
        options: ["A. 35°", "B. 70°", "C. 17,5°", "D. 145°"],
        answer: 1,
        explanation: "Vì Ot là tia phân giác của xOy nên xOy = 2 * xOt = 2 * 35° = 70°."
      },
      // Tự luận
      {
        id: "toan7_de06_tl_01",
        type: "short_essay",
        topic: "Thực hiện phép tính",
        question: "Câu 1. (2,0 điểm) Thực hiện phép tính:\na) 7/10 + 1/5 - 1/2\nb) (-1/2)^2 . 8 - 1/3 : (5/6 - 1/2)",
        modelAnswer: "a) 7/10 + 2/10 - 5/10 = 4/10 = 2/5.\nb) (1/4) * 8 - 1/3 : (5/6 - 3/6) = 2 - 1/3 : (2/6) = 2 - 1/3 : (1/3) = 2 - 1 = 1.",
        explanation: "Quy đồng mẫu số và tính toán theo thứ tự ưu tiên các phép tính."
      },
      {
        id: "toan7_de06_tl_02",
        type: "short_essay",
        topic: "Tìm x",
        question: "Câu 2. (1,5 điểm) Tìm x, biết:\na) x + 5/6 = 1/3\nb) |x| + 3/4 = 2",
        modelAnswer: "a) x = 1/3 - 5/6 = 2/6 - 5/6 = -3/6 = -1/2.\nb) |x| = 2 - 3/4 = 8/4 - 3/4 = 5/4 => x = 5/4 hoặc x = -5/4.",
        explanation: "Quy đồng và tìm nghiệm của phương trình chứa dấu giá trị tuyệt đối."
      },
      {
        id: "toan7_de06_tl_03",
        type: "short_essay",
        topic: "Hình học phẳng",
        image: "/images/math7/toan7_de06_tl_c03.png",
        question: "Câu 3. (2,0 điểm) Cho hình vẽ bên, biết M1 = N1 = 75°.\na) Chứng minh a // b.\nb) Cho Q1 = 60°. Tính số đo các góc Q2, Q3, P1, P2.",
        modelAnswer: "a) M1 và N1 ở vị trí so le trong (hoặc đồng vị theo hình vẽ) và M1 = N1 = 75° => a // b.\nb)\n- Q2 kề bù Q1 => Q2 = 180° - 60° = 120°.\n- Q3 đối đỉnh Q1 => Q3 = 60°.\n- Do a // b: P2 = Q1 = 60° (so le trong), P1 = Q2 = 120° (đồng vị hoặc kề bù P2).",
        explanation: "Áp dụng quan hệ giữa các góc đối đỉnh, kề bù và cặp góc tạo bởi hai đường thẳng song song."
      },
      {
        id: "toan7_de06_tl_04",
        type: "short_essay",
        topic: "Toán thực tế",
        question: "Câu 4. (1,0 điểm) Một tiệm bánh giảm giá 10% cho hộp bánh quy và 25% cho hộp kẹo. Bạn Na mua một hộp bánh quy có giá niêm yết 150 000 đồng và một hộp kẹo có giá niêm yết 80 000 đồng.\na) Bạn Na phải trả bao nhiêu tiền cho hộp kẹo?\nb) Biết tiệm nhập hộp bánh quy với giá 120 000 đồng và hộp kẹo với giá 65 000 đồng. Hỏi khi bán hai sản phẩm này cho bạn Na, tiệm bánh lời hay lỗ bao nhiêu tiền?",
        modelAnswer: "a) Tiền mua hộp kẹo: 80 000 * (100% - 25%) = 60 000 đồng.\nb)\n- Tiền mua bánh quy: 150 000 * 90% = 135 000 đồng.\n- Tổng tiền Na trả: 60 000 + 135 000 = 195 000 đồng.\n- Tổng giá vốn nhập: 120 000 + 65 000 = 185 000 đồng.\n- Lời: 195 000 - 185 000 = 10 000 đồng.",
        explanation: "Tính số tiền thu về từ từng sản phẩm sau giảm giá rồi trừ đi tổng vốn nhập."
      },
      {
        id: "toan7_de06_tl_05",
        type: "short_essay",
        topic: "Hình học - Chứng minh song song",
        image: "/images/math7/toan7_de06_tl_c05.png",
        question: "Câu 5. (0,5 điểm) Cho hình vẽ bên, đường thẳng c cắt hai đường thẳng a, b lần lượt tại A và B. Am là tia phân giác của xAB, Bn là tia phân giác của ABy và Am // Bn. Chứng minh a // b.",
        modelAnswer: "Vì Am // Bn nên mAB = nBA (hai góc so le trong). Vì Am là phân giác xAB nên xAB = 2 * mAB; Bn là phân giác ABy nên ABy = 2 * nBA. Suy ra xAB = ABy. Mà hai góc này ở vị trí so le trong nên a // b.",
        explanation: "Từ hai tia phân giác song song suy ra góc ban đầu bằng nhau, kết luận hai đường thẳng ban đầu song song."
      }
    ]
  }
];

